import React, { useState, useRef, useEffect } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef(null);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <ButtonContainer>
        <Emoji>
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && (
            <EmojiPickerWrapper ref={pickerRef}>
              <Picker onEmojiClick={handleEmojiClick} />
            </EmojiPickerWrapper>
          )}
        </Emoji>
      </ButtonContainer>
      <InputContainer onSubmit={(event) => sendChat(event)}>
        <Input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <SendButton type="submit">
          <IoMdSend />
        </SendButton>
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
  gap: 1rem;
`;

const Emoji = styled.div`
  position: relative;
  svg {
    font-size: 1.5rem;
    color: #ffff00c8;
    cursor: pointer;
  }
`;

const EmojiPickerWrapper = styled.div`
  position: absolute;
  top: -340px; // Adjusted position
  z-index: 1;
  background-color: #1e1e2f  !important;// New background color
  box-shadow: 0 5px 10px #9a86f3;
  border-color: #9a86f3;
  border-radius: 10px; // Rounded corners
  width: 300px; // New width
  height: 300px; // New height
  overflow: hidden; // Ensures no overflow

  .emoji-scroll-wrapper::-webkit-scrollbar {
    background-color: #080420;
    width: 5px;
    &-thumb {
      background-color: #9a86f3;
    }
  }
  .emoji-categories {
    button {
      filter: contrast(0);
    }
  }
  .emoji-search {
    background-color: transparent;
    border-color: #9a86f3;
  }
  .emoji-group:before {
    background-color: #080420;
  }
`;

const InputContainer = styled.form`
  width: 100%;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: #ffffff34;
`;

const Input = styled.input`
  width: 90%;
  height: 60%;
  background-color: transparent;
  color: white;
  border: none;
  padding-left: 1rem;
  font-size: 1.2rem;

  &::selection {
    background-color: #9a86f3;
  }
  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  padding: 0.3rem 2rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9a86f3;
  border: none;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0.3rem 1rem;
    svg {
      font-size: 1rem;
    }
  }

  svg {
    font-size: 2rem;
    color: white;
  }
`;
