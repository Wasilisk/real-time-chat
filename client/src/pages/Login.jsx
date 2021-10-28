import React, {useState} from "react";
import {Button, Paper, TextField, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    root: {
        minWidth: '400px',
        height: "auto",
        border: 0,
        borderRadius: 20,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',

        "& .MuiTextField-root": {
            marginTop: '20px'
        },

        "& .MuiButton-root": {
            marginTop: '20px'
        }
    },
});

const Login = ({
                   socket, username, setUsername,
                   room, setRoom, setShowChat,
                   setAvatar
               }) => {
    const classes = useStyles();
    const [showInput, setShowInput] = useState(false)

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <Paper elevation={3} className={classes.root}>
            <Typography variant="h4" align="center">Real Time Chat</Typography>
            <TextField
                label="Username"
                variant="filled"
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
            />
            <TextField
                label="Room Name"
                variant="filled"
                onChange={(event) => {
                    setRoom(event.target.value);
                }}
            />
            {showInput ?
                <TextField
                    label="Image Url"
                    variant="filled"
                    onChange={(event) => {
                        setAvatar(event.target.value);
                    }}
                /> : null
            }
            <Button variant="contained" onClick={joinRoom}>Join Room</Button>
            {
                showInput ? null :
                    <Button onClick={() => setShowInput(true)}>Add Avatar Image</Button>
            }
        </Paper>
    )
}

export default Login;