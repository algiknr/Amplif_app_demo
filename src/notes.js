import React, {useEffect} from 'react';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import ComplexGrid from "./SingleMovieDisplay";
import Stack from '@mui/material/Stack';
import {Button} from "@mui/material";
// import { Auth } from 'aws-amplify';
import SiteHeader from "./siteHeader";
// import { SxProps } from '@mui/material/styles';




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function Notes({user}) {
    const theme = useTheme();
    let [inside, setInside] = React.useState(false);
    const [movieName, setMovieName] = React.useState([]);
    let [movieKeys, setmovieKeys] = React.useState([]);
    let [chosenMovie, setChosenMovie] = React.useState();
    let [isMovieChosen, setIsMovieChosen] = React.useState(false);
    let [movieNames, setmovieNames] = React.useState([]);
    let [newValue, setNewValue] = React.useState(0);
    let [number, setNumber] = React.useState();
    //let [pagenumber, setPageNumber] = React.useState(0);

    useEffect(() => {genres();   }, []);
    const [vote, setVote] = React.useState(0);

    const handleChangeVote = (event) => {
        setVote(event.target.value);
    };


    const handleChange = async (event) => {
        console.log(event)

        const {
            target: {value},
        } = event;

        await setMovieName(
            value
        );

    };


    async function send(){
    let moviekeystring=""
    movieKeys=movieNames.filter(name=> movieName.includes(name.name))
    setmovieKeys(movieKeys)
        movieKeys.forEach((element, index) => {
            if(movieKeys.length===index+1){
                moviekeystring = moviekeystring + element.id
            }else {
                moviekeystring = moviekeystring + element.id + ",";
            }
        });

        await fetch( "https://api.themoviedb.org/3/discover/movie?api_key=cc7615103a5603c9f2aa88c443deb9ea" +
            "&with_genres=" +moviekeystring+
            "&vote_average.gte="+newValue+
            "&vote_count.gte="+vote
            , {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then(res => res.json())
            .then(async json => {
                console.log(json)
                console.log("inside")
                if (json.total_pages > 500) {
                     number = Math.floor(Math.random() * 500) + 1
                   await setNumber(number)
                } else {

                   number = Math.floor(Math.random() * json.total_pages) + 1
                  await setNumber(number)
                }
                console.log(number)
            }).catch(err => console.log(err));

                await part2("https://api.themoviedb.org/3/discover/movie?api_key=cc7615103a5603c9f2aa88c443deb9ea" +
                    "&with_genres=" +moviekeystring+
                    "&vote_average.gte="+newValue+
                    "&vote_count.gte="+vote+
                    "&page="+number)


    }
    async function part2(address){
        console.log(address)
        let arraynumber=0
        let arraynumberrnd=0
        await fetch( address
            , {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then(res => res.json())
            .then(async json => {
                console.log("djfhjk")
                console.log(json)
                console.log(number)
                console.log(json.results)
                arraynumber=json.results.length
                if(arraynumber>0){
                    arraynumberrnd=Math.floor(Math.random() * arraynumber)
                    console.log(json.results[arraynumberrnd])
                    setChosenMovie(json.results[arraynumberrnd])
                    setIsMovieChosen(true)}else{setIsMovieChosen(false)}
                    setInside(true)
            })
    }
    async function genres(){
        fetch( "https://api.themoviedb.org/3/genre/movie/list?api_key=cc7615103a5603c9f2aa88c443deb9ea&language=en-US"
            , {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then(res => res.json())
            .then(async json => {
                console.log(json)
                await setmovieNames(json.genres)
            }).catch(err => console.log(err));
    }

    return (
        <div >
        <Stack direction="column" spacing={3}>
        <div  >
        <SiteHeader username={user}/>
        </div>
        <div className="App">
            <Stack direction="row" spacing={5}>
            <Box sx={{ width:150 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" sx={{ color:"white", bgcolor: "orange"}}>Vote_Count</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={vote}
                        label="Vote_Count"
                        sx={{ bgcolor: "#fff"}}
                        onChange={handleChangeVote}
                    >
                        <MenuItem value={0}>+0</MenuItem>
                        <MenuItem value={50}>+50</MenuItem>
                        <MenuItem value={100}>+100</MenuItem>
                        <MenuItem value={500}>+500</MenuItem>
                        <MenuItem value={1000}>+1000</MenuItem>
                        <MenuItem value={5000}>+5000</MenuItem>
                        <MenuItem value={10000}>+10000</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box
                sx={{
                    '& > legend': { mt: 2 },
                }}
            >
            </Box>
                    <FormControl sx={{  width: 300 }}>
                    <InputLabel id="demo-multiple-chip-label" sx={{ color:"white", bgcolor: "orange"}}>Genres</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={movieName}
                        onChange={handleChange}
                        sx={{ bgcolor: "#fff"}}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}

                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >

                        {movieNames.map((name) => (
                            <MenuItem
                                key={name.id}
                                value={name.name}
                                style={getStyles(name.name, movieName, theme)}
                            >
                                {name.name}
                            </MenuItem>
                        ))}
                    </Select>
                    </FormControl>

                <Stack direction="column">
                 <div style={{color:"orange"}}> Least Score</div>
                    <Box style={{backgroundColor:"white"}}>
                <Rating  onChange={(event, newValue) => {
                    setNewValue(newValue);
                }} defaultValue={0} value={newValue} max={10} /></Box></Stack>
                <Button variant="contained" onClick={send} color="success">
                    PUSH FOR MOVIE
                </Button>
            </Stack>

        </div>
            <div>
                {isMovieChosen ? (
                    <ComplexGrid movie={chosenMovie}/>
                ) : (inside?(<div style={{ marginTop:"10rem",color:"white"}}><Typography variant={"h3"}> Sorry no movie was found with these parameters :(</Typography></div>):(<div><Box> </Box></div>)
                )
                }
            </div></Stack></div>
    ) }

export default withAuthenticator(Notes);