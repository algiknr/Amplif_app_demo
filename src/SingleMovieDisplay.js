import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import {makeStyles} from "@material-ui/core/styles";
//import {API} from "aws-amplify";
//import SnackbarContent from "@material-ui/core/SnackbarContent";
//import {listMovieListItems} from './graphql/queries';
//import {createMovieListItem as createMovieListItemMutation, deleteMovieListItem as deleteMovieListItem} from './graphql/mutations';
import {Button, Snackbar} from "@mui/material";
import Box from "@mui/material/Box";

const Img = styled('img')({
    margin: 'auto',
    display: 'flex',
    maxWidth: '100%',
    maxHeight: '100%',

});

const useStyles = makeStyles(() => ({

    paper_green: {
        backgroundColor: "#77DD77",
    },
    paper_orange: {
        backgroundColor: "#F8B88B",
    },
    snackbarStyleViaContentProps: {
        backgroundColor: "green"
    }

}));


async function trailer(id){
    fetch( "https://api.themoviedb.org/3/movie/+"+id+"/videos?api_key=cc7615103a5603c9f2aa88c443deb9ea"
, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(async json => {
            const trailer = json.results.filter(piece => (piece.type==="Trailer" || piece.type==="trailer"));
            if(trailer===0){
                alert("There is no trailer connection for this movie.")
            }else{
                window.open("https://www."+trailer[0].site.toLowerCase()+".com/watch?v="+trailer[0].key)
            }

        }).catch(() =>   alert("There is no trailer connection for this movie."));
}
/*async function CreateMovieListtem(movie) {
    console.log(movie)


    const MovieListItem = {
        name: movie.title,
        description: movie.overview,
        image: movie.poster_path,
        Release: movie.release_date,
        Score: movie.vote_average,
        Vote_Count: movie.vote_count,
        Liked: "",
        Watched: "",
    };

    await API.graphql({ query: createMovieListItemMutation, variables: {input: MovieListItem}})};*/

export const ComplexGrid= ({movie}) =>  {
    const [mouseopen, setMouseopen] = React.useState(false);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen( true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            setOpen( false );
        }
        setOpen( false );
    };

    let adress="https://image.tmdb.org/t/p/original/"+movie.poster_path
    return (

        <Box >
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                width: 1000,
                height: 500,
                flexGrow: 10,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            <Grid container spacing={3}>
                <Grid item>
                    <Stack  direction="column" spacing={1}>
                    <ButtonBase sx={{ width: 300, height: 420 }}>
                        {movie.poster_path==null?(<div>No Poster</div>):(<Img alt="complex" src={adress}  onMouseOver={() => setMouseopen(true)}
                                                                              onMouseOut={() =>setMouseopen(false)}
                                                                              style={
                                                                                  mouseopen
                                                                                      ? { transform: "scale(1.05)", overflow: "hidden"}
                                                                                      : { transform: "scale(1)", overflow: "hidden"}
                                                                              } />)}
                    </ButtonBase>
                        <Button onClick={()=>trailer(movie.id)} style={{backgroundColor:'darkred',color:'white'}}>Trailer</Button></Stack>
                </Grid>
                <Grid item xs={12} sm container>

                        <Grid item container direction="horizontal" >
                            <Grid item xs={12}>
                                <Paper className={classes.paper_green}>
                            <Typography variant="h4" component="div">
                                {movie.title}
                            </Typography ></Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper_orange} style={{maxheight:'100%'}}>
                                    {typeof movie.overview!=='string'?(<div>No Overview</div>):(<div>{movie.overview===""?(<div>No Overview</div>):(<div>{movie.overview} </div>)}</div>)}</Paper>
                            </Grid>
                            <Grid item xs={12}>

                                    <Stack  direction="column" spacing={5}>
                                        <Paper className={classes.paper_green} >
                            <Stack direction="row"  spacing={5}>

                            <Typography >
                                <Button variant="contained"   style={{
                                    marginTop:"1rem",
                                    marginBottom:"1rem",
                                    borderRadius: 35,
                                    marginLeft:"1rem",
                                    backgroundColor: "darkorange",

                                }}> Release Date: {movie.release_date}</Button>
                            </Typography>
                                <Typography variant="subtitle1" component="div">
                                    <Button variant="contained"   style={{
                                        marginTop:"1rem",
                                        borderRadius: 35,
                                        backgroundColor: "darkorange",

                                    }}>
                                        Score: {movie.vote_average}</Button>
                                </Typography>
                                <Typography variant="subtitle1" component="div">
                                    <Button variant="contained"   style={{
                                        marginTop:"1rem",
                                        borderRadius: 35,
                                        marginRight:"1rem",
                                        backgroundColor: "darkorange",

                                    }}>
                                        Vote Count: {movie.vote_count}</Button>
                                </Typography></Stack></Paper>
                                        <Button variant="contained" onClick={() => {

                                        }}
                                              onClickCapture={handleClick}  color="success">
                                            ADD TO LIST
                                        </Button> <Snackbar
                                        anchorOrigin={{ vertical: 'top', horizontal: 'center'} }
                                        open={open}
                                        onClose={handleClose}
                                        autoHideDuration={2000}
                                        ContentProps={{
                                            "aria-describedby": "message-id",
                                            className: classes.snackbarStyleViaContentProps
                                        }}
                                        message={
                                            <span id="message-id">
                                                <div>Movie {movie.title} successfully added to your list.</div> </span>
                                        }
                                    /></Stack>


                            </Grid>

                    </Grid>

                </Grid>
            </Grid>
        </Paper></Box>
    );
}
export default ComplexGrid;
