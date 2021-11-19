import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { useAuthState } from "react-firebase-hooks/auth"
import getRecipientEmail from "../utils/getRecipientEmail"
import { auth,db } from "../firebaseConfig";
import {useCollection} from "react-firebase-hooks/firestore"
import { useRouter } from "next/router"

function Chat({id,users}) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email", "==", getRecipientEmail(users,user)[1])
    );
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users,user)[1]

    const enterChat = () => {
        router.push(`/chat/${id}`);
    }

    let colors = ["#335BFF", "#9CFF33", "#FF3358", "#F1E116", "#C2B7B9"];

    function randNum() {
        return Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    }
    
    let avatarColor = colors[randNum()];

    const nameCapitalized = recipientEmail.charAt(0).toUpperCase() + recipientEmail.slice(1)

    return (
        <Container onClick={enterChat}>
            { recipient ? (
                <UserAvatar src={recipient?.photoURL} />
            ) : (
                <UserAvatar style={{backgroundColor:`${avatarColor}`}}>{nameCapitalized[0]}</UserAvatar>
            )}
            <p>{recipientEmail}</p>
        </Container>
    )
}

export default Chat

const Container = styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding: 15px;
word-break: break-word;

:hover{
    background-color: #e9eaeb;
}
`
const UserAvatar = styled(Avatar)`
margin: 5px;
margin-right: 15px;
`