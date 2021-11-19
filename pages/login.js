import Head from 'next/head';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { auth,provider } from "../firebaseConfig"

function Login() {

    const signIn = () =>{
        auth.signInWithPopup(provider).catch(alert);
    }

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                {/* <Logo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" /> */}
                <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2042px-WhatsApp.svg.png" />
                <Button onClick={signIn} variant="outlined">Sign in with google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login;

const Container = styled.div`
display: grid;
place-items: center;
height: 100vh;
background-color: whitesmoke;
`;

const LoginContainer = styled.div`
display: flex;
flex-direction: column;
padding: 100px;
align-items: center;
background-color: white;
border-radius: 5px;
box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.75);
`;
const Logo = styled.img`
height: 200px !important;
width: 200px;
/* background-color: yellow; */
border-radius: 50%;
margin-bottom: 50px;
`;
