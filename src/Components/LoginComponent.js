import React, { useState } from "react";
import styled from "styled-components";
import background from "../utils/login-background.jpg";
import { Link,useNavigate } from "react-router-dom";
//import { events } from "../../Backend/Models/User";

const BodyContainer = styled.div`
  background: url(${background}) center center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  margin: -20px 0 10px;
  box-sizing: border-box;
`;

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 400px;
`;

const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(100%);` : null}
`;

const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signingIn !== true
      ? `
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
    `
      : null}
`;

const Form = styled.form`
  background-color: #00bc8c;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 10px;
  margin: 8px 0;
  width: 100%;
  color: black;
`;

const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(-100%);` : null}
`;

const Overlay = styled.div`
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(50%);` : null}
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signingIn !== true ? `transform: translateX(0);` : null)}
`;

const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(20%);` : null}
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

// Main Login Component
function LoginComponent() {
  const [signIn, toggle] = useState(true);
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
  };
  const [logincredentials, setlogincredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate()
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: logincredentials.email,
        password: logincredentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    if(json.success){
      navigate("/");
      localStorage.setItem("authToken",json.authToken)
    }
  };
  const onchangelogin = (event) => {
    setlogincredentials((prevCredentials) => {
      const updatedCredentials = {
        ...prevCredentials,
        [event.target.name]: event.target.value,
      };
      return updatedCredentials;
    });
  };

  const onchange = (event) => {
    setcredentials((prevCredentials) => {
      const updatedCredentials = {
        ...prevCredentials,
        [event.target.name]: event.target.value,
      };
      return updatedCredentials;
    });
  };

  return (
    <BodyContainer>
      <Container>
        <OverlayContainer signingIn={signIn}>
          <Overlay signingIn={signIn}>
            <LeftOverlayPanel signingIn={signIn}>
              <Title>Welcome Back!</Title>
              <Paragraph>
                To keep connected with us, please login with your personal info
              </Paragraph>
              <GhostButton onClick={() => toggle(true)}>Sign In</GhostButton>
            </LeftOverlayPanel>
            <RightOverlayPanel signingIn={signIn}>
              <Title>Hello, Friend!</Title>
              <Paragraph>
                Enter your personal details and start the journey with us
              </Paragraph>
              <GhostButton onClick={() => toggle(false)}>Sign Up</GhostButton>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
        <SignUpContainer signingIn={signIn}>
          <Form onSubmit={handleSubmit}>
            <Title>Create Account</Title>
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={credentials.name}
              onChange={onchange}
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={credentials.email}
              onChange={onchange}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onchange}
            />
            <Input
              type="text"
              placeholder="Location"
              name="location"
              value={credentials.location}
              onChange={onchange}
            />
            <Button type="submit" className="btn">
              Sign Up
            </Button>
          </Form>
        </SignUpContainer>
        <SignInContainer signingIn={signIn}>
          <Form onSubmit={handleSubmitLogin}>
            <Title>Sign in</Title>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={logincredentials.email}
              onChange={onchangelogin}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={logincredentials.password}
              onChange={onchangelogin}
            />
            <Anchor href="#">Forgot your password?</Anchor>
            <Button type="submit" className="btn">
              Sign In
            </Button>
          </Form>
        </SignInContainer>
      </Container>
    </BodyContainer>
  );
}

export default LoginComponent;
