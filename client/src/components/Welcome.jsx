import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import { useNavigate } from "react-router-dom";

export default function Welcome({ currentUser }) {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
     const fetchData = async () => {
      const data = JSON.parse(localStorage.getItem("chat-app-user"));
      if (data) {
        setUserName(data.username);
      } else {
        console.error("No user data found, redirecting to login...");
        // Redirect to login if user data is missing
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
