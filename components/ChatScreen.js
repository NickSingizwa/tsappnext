import styled from "styled-components"
import  { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
import { auth, db } from "../firebaseConfig"
import { Avatar, IconButton } from "@material-ui/core"
import MoreVert from "@material-ui/icons/MoreVert"
import AttachFile from "@material-ui/icons/AttachFile"
import { useCollection } from "react-firebase-hooks/firestore"
import Message from "./Message"
import { InsertEmoticon } from "@material-ui/icons"
import { Mic } from "@material-ui/icons"
import { useState } from "react"
import firebase from "firebase/compat/app"
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import { useRef } from "react";

function ChatScreen({chat, messages}) {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("");
    const endOfMessagesRef = useRef(null);
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection("messages").doc(router.query.id).collection("sentmessages").orderBy("timestamp", "asc"));
    
    const showMessages = () => {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(message => (
                <Message
                 key={message.id} 
                 user={message.data().user}
                 message = {{
                     ...message.data(),
                     timestamp: message.data().timestamp?.toDate().getTime()
                 }}
                />
            ))
        }
        else{
            return JSON.parse(messages).map(message => (
                <Message key={message.id} user={message.user} message={Message} />
            ));
        }
    }

    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
             behavior: "smooth",
             block: "start"
        });
    }

    const sendMessage = (e) => {
        e.preventDefault();
        //merge for not overwriting the previous message
        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, {merge: true});
        db.collection("messages").doc(router.query.id).collection("sentmessages").add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.email,
            photoURL: user.photoURL,
        })
        setInput("");
        scrollToBottom();
    }

    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email","==",getRecipientEmail(chat.users, user)[1])
    );
    const recipient = recipientSnapshot?.docs?.[0]?.data(); 
    const recipientEmail = getRecipientEmail(chat.users, user)[1];

    let colors = ["#335BFF", "#9CFF33", "#FF3358", "#F1E116", "#C2B7B9"];

    function randNum() {
        return Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    }
    
    let avatarColor = colors[randNum()];

    const nameCapitalized = recipientEmail.charAt(0).toUpperCase() + recipientEmail.slice(1)

    return (
        <Container>
            <Header>
            { recipient ? (
                <Avatar src={recipient?.photoURL} />
            ) : (
                <Avatar style={{backgroundColor:`${avatarColor}`}}>{nameCapitalized[0]}</Avatar>
            )}
                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>Last active: {' '} {recipient?.lastSeen?.toDate() ? (
                            <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                        ) : "Unavailable"}
                        </p>
                    ):(
                        <p>Loading Last active...</p>
                    )}
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                    <AttachFile />
                    </IconButton>
                    <IconButton>
                    <MoreVert />
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessagesRef} />
            </MessageContainer>
            <InputContainer>
            <InsertEmoticon />
                <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" />
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
                <Mic />
            </InputContainer>
        </Container>
    )
}

export default ChatScreen;

const Container = styled.div`

`;
const Input = styled.input`
flex: 1;
outline: 0;
border: none;
border-radius: 10px;
align-items: center;
padding: 20px;
margin-left: 15px;
margin-right: 15px;
background-color: whitesmoke;
`;
const InputContainer = styled.form`
display: flex;
align-items: center;
padding: 10px;
position: sticky;
bottom: 0;
background-color: #fff;
z-index: 100;
`;
const Header = styled.div`
position: sticky;
background-color: white;
z-index: 100;
top: 0;
display: flex;
padding: 11px;
height: 80px;
align-items: center;
border-bottom: 1px solid whitesmoke;

`;
const HeaderInformation = styled.div`
margin-left: 15px;
flex: 1;

>h3{
    margin-bottom: 3px;
}
>p{
    font-size: 14px;
    color: gray;
}

`;
const HeaderIcons = styled.div`

`;
const MessageContainer = styled.div`
padding: 30px;
background-color: #e5ded8;
min-height: 90vh;
`;
const EndOfMessage = styled.div`
margin-bottom: 50px;
`;
