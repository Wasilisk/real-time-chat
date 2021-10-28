import './App.css';
import io from 'socket.io-client'
import {useState} from "react";
import Login from "./pages/Login";
import {Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Chat from "./pages/Chat";

const socket = io.connect("http://localhost:3001");

const useStyles = makeStyles((theme) =>({
    root: {
        background: theme.palette.background.default,
        height: '100vh'
    },
    mainGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

function App() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [avatar, setAvatar] = useState("");
    const [showChat, setShowChat] = useState(false);


    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs>
            </Grid>
            <Grid item xs={6} className={classes.mainGrid}>
                {showChat ?
                    <Chat socket={socket} username={username} room={room} avatar={avatar}/> :
                    <Login
                        socket={socket} username={username}
                        setUsername={setUsername} room={room}
                        setRoom={setRoom} setShowChat={setShowChat}
                        setAvatar={setAvatar}
                    />
                }
            </Grid>
            <Grid item xs>
            </Grid>
        </Grid>
    );
}

export default App;
