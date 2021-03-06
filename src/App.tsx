import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import FormData from "form-data";

// material-ui components
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";

// material-ui icon
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";

// import css files
import "./App.css";

// import components
import Appbar from "./components/Navbar";

//nickname textfield custom textfield
const NicknameTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "grey",
  },
  "& label": {
    color: "grey",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "grey",
    },
  },
});

function App() {
  const [stage, setStage] = useState(0);
  const [nickname, setNickname] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File>();

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const handleChangeContinueButton = () => {
    setStage(stage + 1);
  };

  useEffect(() => {
    console.log("image", image);
  }, [image]);

  const send = () => {
    let data = new FormData();
    data.append("image", image);
    data.append("content", message);
    data.append("username", nickname);
    data.append("avatar_url", process.env.REACT_APP_DISCORD_WEBHOOK_IMAGE_URL);

    axios
      .post(process.env.REACT_APP_DISCORD_WEBHOOK_URL as string, data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    handleChangeContinueButton();
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <div className="App">
      <Appbar />
      <div className="App-header">
        {stage === 0 && (
          <>
            <h1>
              Write your name,
              <br />
              add picture to report message and send
            </h1>
            <NicknameTextField
              id="nickname"
              autoComplete="off"
              onChange={handleChangeNickname}
              label="Your Name"
              margin="normal"
              inputProps={{
                min: 0,
                style: { textAlign: "center", color: "white" },
              }}
            />

            <Button
              onClick={handleChangeContinueButton}
              color="inherit"
              disabled={
                !nickname || nickname.length < 3 || nickname.length >= 8
              }
              variant="contained"
              endIcon={<SendIcon />}
              size="large"
              className="mt-4 text-body"
            >
              continue
            </Button>
          </>
        )}

        {stage === 1 && (
          <>
            <TextareaAutosize
              onChange={handleChangeMessage}
              aria-label="empty textarea"
              placeholder="Your Report Message.."
              style={{
                width: "50%",
                height: 300,
                maxHeight: "100%",
                backgroundColor: "#282c34",
                color: "white",
              }}
            />

            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(event) => {
                  const files = event.target.files;
                  if (files !== null && files.length > 0) {
                    console.log(files[0]);
                    setImage(files[0]);
                  }
                }}
              />
              <Button
                variant="contained"
                component="span"
                endIcon={<PhotoCamera />}
                color="inherit"
                className="text-body"
              >
                Image
              </Button>
            </label>

            <Button
              onClick={send}
              color="inherit"
              disabled={!message || message.length < 3}
              variant="contained"
              endIcon={<SendIcon />}
              size="large"
              className="mt-4 text-body"
            >
              Send
            </Button>
          </>
        )}

        {stage === 2 && (
          <>
            <Typography variant="h3" gutterBottom component="div">
              Succesfull
            </Typography>
            <DoneAllIcon sx={{ fontSize: 320 }} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
