import React from "react";
import {Avatar, Paper, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    messageBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: '10px',
        marginBottom: '10px',

        '& > .MuiAvatar-root': {
            marginLeft: '10px'
        },
        '& > .MuiPaper-root': {
            borderRadius: '10px'
        }
    },
    userMessageBox: {
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'row-reverse',
        marginTop: '10px',
        marginBottom: '10px',

        '& > .MuiAvatar-root': {
            marginRight: '10px',
            marginLeft: '10px'
        },
        '& > .MuiPaper-root': {
            backgroundColor: '#3b5998',
            borderRadius: '10px'
        }
    },
    textBox: {
        maxWidth: '80%',
        height: 'auto',
        padding: '4px 8px 0px 8px',
        marginLeft: '10px',
    },
    textClass: {
        wordWrap: 'break-word'
    },
    authorName: {
        color: '#a1a1a1',
        fontSize: [14, "!important"]
    },
    messageTime: {
        color: '#dcdcdc',
        fontSize: [11, "!important"]
    }
});

const Message = ({message, username}) => {
    const classes = useStyles();
    return (
        <div className={username === message.author ?
            classes.userMessageBox : classes.messageBox}>
            {message.avatar === "" ?
                <Avatar>{message.author.charAt(0)}</Avatar> :
                <Avatar src={message.avatar}></Avatar>
            }
            <Paper className={classes.textBox} elevation={4}>
                <Typography className={classes.authorName}>{message.author}</Typography>
                <Typography className={classes.textClass}>
                    {message.message}
                </Typography>
                <Typography className={classes.messageTime} align="right">
                    {message.time}
                </Typography>
            </Paper>
        </div>
    )
}

export default Message;