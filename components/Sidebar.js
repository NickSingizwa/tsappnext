import styled from 'styled-components';
import { Avatar, IconButton, Button } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat';

function Sidebar() {

    const [user] = useAuthState(auth);
    const userChatRef = db.collection('messages').where('users', 'array-contains', user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt('Enter the email address of the user');
        if (!input) return null;
        if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
            //chat logic
            db.collection("messages").add({
                users: [user.email, input],
            })
        }
        else {
            alert('Invalid email or chat already exists');
            return null;
        }
    }

    const chatAlreadyExists = (recipientEmail) => {

        // !! to return boolean
        !!chatsSnapshot?.docs.find(
            (chat) =>
             chat.data().users.find((user) => user === recipientEmail)?.length > 0
            );
    }

    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />

                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>

            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search or start new chat" />
            </Search>
            <SidebarButton onClick={createChat}>START A NEW CHAT</SidebarButton>
            {
                chatsSnapshot?.docs.map((chat) => (
                    <Chat key={chat.id} id={chat.id} users={chat.data().users} />
                ))
            }
        </Container>
    )
}

export default Sidebar;

const Container = styled.div`
flex: 0.45;
border-right: 1px solid #e0e0e0;
height: 100vh;
min-width: 300px;
max-width: 350px;
overflow: scroll;

::-webkit-scrollbar {
    display: none;
}
`;
const Search = styled.div`
display: flex;
align-items: center;
padding: 20px;
border-radius: 2px;
`;
const SearchInput = styled.input`
outline-width: 0;
border: none;
flex: 1;
`;
const Header = styled.div`
display: flex !important;
position: sticky;
top: 0;
background-color: whitesmoke !important;
z-index: 1;
justify-content: space-between;
align-items: center;
padding: 15px;
height: 80px;
border-bottom: 1px solid whitesmoke;
`;
const SidebarButton = styled(Button)`
width: 100%;
&&&{
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
}

`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover{
        opacity: 0.8;
    }
`;
const IconsContainer = styled.div`
    
`;