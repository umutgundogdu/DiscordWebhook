import React,{ useState } from "react";
import axios from 'axios';

// material-ui components
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import IconButton from '@mui/material/IconButton';

// material-ui icon
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';

// import css files
import './App.css';

// import components
import Appbar from "./components/Navbar";

//nickname textfield custom textfield
const NicknameTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'grey',
  },
  '& label': {
    color: 'grey',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'grey',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'grey',
    },
  },
});

function App() {
  const [stage, setStage] = useState(0);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeNickname = (e) => {
    setNickname(e.target.value);
  }
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  }
  const handleChangeContinueButton = () => {
    setStage(stage + 1);
  }
  
  const finish = () => {
    axios.post(process.env.REACT_APP_DISCORD_WEBHOOK_URL, {"content": message, "username": nickname, "avatar_url": process.env.REACT_APP_DISCORD_WEBHOOK_IMAGE_URL})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  const Input = styled('input')({
    display: 'none',
  });
  

  return (
    <div className="App">
      <Appbar />
      <header className="App-header">
        

        {stage === 0 && (
          <>
            <NicknameTextField id="nickname" onChange={handleChangeNickname} label="nickname" margin="normal" inputProps={{min: 0, style: { textAlign: 'center',color: 'white' }}}/>

            <Button onClick={handleChangeContinueButton} color="primary" disabled={nickname === "" ? "false" : ""} variant="contained" endIcon={<SendIcon />} size="large" className="mt-4">
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
              style={{ width: "50%", height: 300, maxHeight: "100%",backgroundColor: "#282c34", color: "white" }}
            />

            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" multiple type="file" />
              <Button variant="contained" component="span" endIcon={<PhotoCamera />}>
                Upload Image
              </Button>
            </label>
            

            <Button onClick={finish} color="primary" disabled={message === "" ? "false" : ""} variant="contained" endIcon={<SendIcon />} size="large" className="mt-4">
              Send
            </Button>
          </>
        )}


        {stage === 2 && (
          <>
            <Typography variant="h3" gutterBottom component="div">
              Succesfull
            </Typography>
            <DoneAllIcon sx={{ fontSize: 320 }}/>
          </>
        )}
        

      </header>
    </div>
  );
}

export default App;
