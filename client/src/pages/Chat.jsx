import React, {useEffect, useState} from "react";
import ScrollToBottom, {useScrollToBottom} from "react-scroll-to-bottom";
import {Button, Paper, TextField, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Message from "../component/Message";
import {dateFormat} from "../utils/dateFormat";

const useStyles = makeStyles({
    root: {
        minWidth: '320px',
        width: '600px',
        height: '90vh',
        border: 0,
        borderRadius: 20,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
    },
    chatHeader: {
        width: '100%',
        height: '5%',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageInput: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        marginTop: '10px',

        "& .MuiTextField-root": {
            width: '80%'
        },

        "& .MuiButton-root": {
            width: '20%',
            padding: '15px',
            marginLeft: '10px'
        }
    },
    scrollBox: {
        height: '100%',
        overflowY: 'auto',
        msOverflowStyle: 'none',
    },
    messageBox: {
        minHeight: '100%',
        borderRadius: '10px',
        height: 'auto',
        overflowY: 'auto',
        msOverflowStyle: 'none',

        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
});


function Chat({socket, username, room, avatar}) {
    const classes = useStyles();
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const scrollToBottom = useScrollToBottom();

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                avatar: avatar,
                message: currentMessage,
                time: dateFormat()
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            scrollToBottom();
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <Paper elevation={3} className={classes.root}>
            <Paper elevation={0} className={classes.chatHeader}>
                <Typography align="center" variant="h5">
                    {room}
                </Typography>
            </Paper>
            <ScrollToBottom
                className={classes.scrollBox}
                scrollViewClassName={classes.messageBox}
            >
                <Paper elevation={1} className={classes.messageBox}>
                    {messageList.map((message, index) =>
                        <Message key={index} message={message} username={username}/>
                    )}
                </Paper>
            </ScrollToBottom>
            <Paper elevation={2} className={classes.messageInput}>
                <TextField
                    label="Your message..."
                    variant="outlined"
                    value={currentMessage}
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                />
                <Button variant="contained" onClick={sendMessage}>Send</Button>
            </Paper>
        </Paper>
    );
}

export default Chat;