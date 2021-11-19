import styled from "styled-components"
import Head from "next/head"
import Sidebar from "../../components/Sidebar"
import ChatScreen from "../../components/ChatScreen";
import { auth,db } from "../../firebaseConfig";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
function Chat({chat,messages}) {
const [user] = useAuthState(auth)
    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users,user)[1]}</title>
            </Head>
            <Sidebar/>
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages}/>
            </ChatContainer>
        </Container>
    )
}

export default Chat;

//context for accessing props
export async function getServerSideProps(context){
const ref = db.collection("messages").doc(context.query.id);

//prep messages on the server
const messagesRes = await ref
.collection("sentmessages")
.orderBy("timestamp","asc")
.get();

const messages = messagesRes.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
})).map(messages => ({
    ...messages,
    //for avoid the loosing of datatype of the timestamp that always happens when you get it from your backend
    timestamp: messages.timestamp.toDate().getTime()
}))

//prep the chats
const chatRes = await ref.get();

const chat = {
    id: chatRes.id,
    ...chatRes.data()
}

return{
    props: {
        messages: JSON.stringify(messages),
        chat: chat
    }
}

}

const Container = styled.div`
display: flex;
`;
const ChatContainer = styled.div`
flex: 1;
overflow: scroll;
height: 100vh;

::-webkit-scrollbar{
display: none;
}
`;
