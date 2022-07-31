import React, {useEffect, useState} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import awsconfig from './aws-exports'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    TextField
} from "@mui/material";
import Amplify, {API, Auth, graphqlOperation} from "aws-amplify";
import {listMovieListItems} from "./graphql/queries";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {
    deleteMovieListItem as deleteMovieListItemMutation,
    updateMovieListItem as updateMovieListMutation
} from './graphql/mutations';
import "./mymovielist.css"
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from "@mui/material/Stack";
import {withAuthenticator} from "@aws-amplify/ui-react";
import {SiteHeader} from "./siteHeader";


Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props}  />;
});
function MovieImageList({user}) {
    const[go,setGo]=useState(false)
    const[items,setItems]=useState([])
    useEffect(() => {
        fetchMovies(user.username).then(()=> []);
    }, []);
       const [open, setOpen] = React.useState(false);


         const handleClickOpen = () => {
           setOpen(true);
         };

         const handleClose = () => {
           setOpen(false);
         };

    async function deleteMovie(id,continueto,version) {
        if(continueto){
        const del = {
            id: id,
            _version: version
        };
        const newNotesArray = items.filter(movie => movie.id !== id);
        setItems(newNotesArray)
        await API.graphql({ query: deleteMovieListItemMutation, variables: { input: del }});   }   }

    async function fetchMovies(user) {


        const apiData = await API.graphql(
            graphqlOperation(listMovieListItems, { filter: { user: { contains: user } } })
        )

        let arr=apiData.data.listMovieListItems.items.sort((a,b)=>(new Date(a.createdAt)-new Date(b.createdAt)))



        arr.forEach((element, index) => {
            arr[index] = { id:element.id,img: element.image,
                title: element.name,
                score: element.Score,
                content:element.description,
                delete:element._deleted,
                liked:element.Liked,
                watched:element.Watched,
                released:element.Release,
                version:element._version,
                user:element.user
            }
            setVersion(prev => ({
                ...prev,
                [element.name]:element._version
            }))
        });
     await setItems(arr.filter(function(e){return e.delete!==true}))
     setGo(true)
    }
    const[version,setVersion]=useState({})
    const [isInfo, setIsInfo] = useState({});
    const [isLiked, setIsLiked] = useState({});
    const [isWatched, setIsWatched] = useState({});
    const [isup, setIsUp] = useState({});

    function handleClick(event){
        const id = event.currentTarget.name;
        setIsInfo(prev => ({
            ...prev,
            [id]: !prev[id]
        }))

    }

    async function handleliked(movie, val, id,version) {

        const idindexname = movie.currentTarget.name
        setIsUp(prev => ({
            ...prev,
            [idindexname]: true
        }))
        setIsLiked(prev => ({
            ...prev,
            [idindexname]: val
        }))

        const MovieListItem = {
            id: id,
            Liked:val,
            _version: version
        };

        const update=await API.graphql({query: updateMovieListMutation, variables: {input: MovieListItem}})

       setVersion(prev => ({
           ...prev,
           [idindexname]: update.data.updateMovieListItem._version
       }))



    }

    async function handlewatched(movie, val, id,version) {
        const idindexname = movie.currentTarget.name
        setIsWatched(prev => ({
            ...prev,
            [idindexname]: val
        }))

        const MovieListItem = {
            id: id,
            Watched:val,
            _version: version
        };

        const update=await API.graphql({query: updateMovieListMutation, variables: {input: MovieListItem}})

        setVersion(prev => ({
            ...prev,
            [idindexname]: update.data.updateMovieListItem._version
        }))

    }

    return (
        <div>
            {go ? (
                    <div>
                        <SiteHeader username={user} comefrom={"mymovielist"}/>


        <ImageList cols={3} sx={{  height: window.innerHeight}}>
            {items.map((item,index) => (
                <div key={item.title}  >
                <ImageListItem  key={item.title}  >
                    <div className='container'>

                    <img
                        style={{ width: "20em", height: "28em" }}
                        src={"https://image.tmdb.org/t/p/original"+item.img}
                        alt={item.title}
                        loading="lazy"
                    />{item.title in isInfo && isInfo[item.title]===true ?(<div className='centered'>
                        <TextField
                        style={{width: "20em", height: "28em"}}
                        inputProps={{ style: { color: "white",backgroundColor:"black",opacity:"0.7" } }}
                        id={index}
                        label=""
                        value={item.content}
                        rows={16}
                        placeholder="Placeholder"
                        multiline
                        />  </div>):(<div> <div className='top-right'><IconButton color="error" style={{backgroundColor:"white", marginRight:"3px", borderRadius:"25px"}}
                                                                                  size="large">
                        <DeleteIcon onClickCapture={handleClickOpen} fontSize="inherit" />
                        <Dialog
                         open={open}
                         TransitionComponent={Transition}
                         keepMounted
                         onClose={handleClose}
                         aria-describedby="alert-dialog-slide-description"
                       >
                         <DialogTitle>{"DELETION"}</DialogTitle>
                         <DialogContent>
                           <DialogContentText id="alert-dialog-slide-description">
                               Are you sure do you want to delete this movie?
                           </DialogContentText>
                         </DialogContent>
                         <DialogActions>
                           <Button onClick={()=>deleteMovie(item.id,true,version[item.title])} onClickCapture={handleClose}>OK</Button>
                           <Button onClick={handleClose}>CANCEL</Button>
                         </DialogActions>
                       </Dialog></IconButton></div><div className="top-left">{(item.watched==="true" && !(item.title in isWatched))|| isWatched[item.title]==="true"? <IconButton onClick={async(e)=>await handlewatched(e,"false",item.id,version[item.title])}
                                                                                                                                                                                    name={item.title} style={{borderRadius:"25px", color: "white",size:'small', backgroundColor: "grey" }}><VisibilityIcon/></IconButton>:<IconButton onClick={async(e)=>await handlewatched(e,"true",item.id,version[item.title])} name={item.title}  style={{borderRadius:"25px", color: "white", size:'small', backgroundColor: "grey" }}><VisibilityOffIcon/></IconButton>}</div></div>)}</div>
                    <ImageListItemBar
                        style={{ width: "20em", height: "8em" }}
                        title={item.title}
                        subtitle={<div><Stack spacing={1.8} direction="row">
                            <div>Score: {item.score}</div><div>Released: {item.released.substring(0,4)}</div>
                            <div>{(item.liked==="true"&&!(item.title in isup))||isLiked[item.title]==="true"?
                                <IconButton onClick={async(e)=>await handleliked(e,"",item.id,version[item.title])} name={item.title}  style={{borderRadius:"25px", color: "white",size:'small', backgroundColor: "green" }}><ThumbUpAltIcon/></IconButton> : <IconButton name={item.title} onClick={async(e)=>await handleliked(e,"true",item.id,version[item.title])} style={{borderRadius:"25px", color: "white",size:'small', backgroundColor: "green" }}><ThumbUpOffAltIcon/></IconButton> }  </div>
                            <div>{(item.liked==="false"&&!(item.title in isup))||isLiked[item.title]==="false"?<IconButton onClick={async(e)=>await handleliked(e,"",item.id,version[item.title])} name={item.title} style={{borderRadius:"25px", color: "white",size:'small', backgroundColor: "red" }}><ThumbDownAltIcon/></IconButton>:<IconButton name={item.title} onClick={async(e)=>await handleliked(e,"false",item.id,version[item.title])} style={{borderRadius:"25px", color: "white",size:'small', backgroundColor: "red" }}><ThumbDownOffAltIcon/></IconButton>}</div></Stack></div>}
                            actionIcon={
                            <IconButton
                                name={item.title}
                                onClick={(e)=>handleClick(e)}
                                sx={{ color: 'yellow',marginBottom:"5rem"}}
                            >
                                <InfoIcon />
                            </IconButton>

                        }
                    />
                </ImageListItem> </div>
            ))}
        </ImageList> </div> ) : null}
        </div>
    );
}
export default withAuthenticator(MovieImageList);