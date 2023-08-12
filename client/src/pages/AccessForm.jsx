import { useContext, useEffect, useState } from "react"
import { DataContext } from "../Context/DataProvider";
import { Box, TextField, Typography, FormControl, FormControlLabel, RadioGroup, Radio, Button, Dialog, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import styled from "@emotion/styled";
import { v4 as uuid } from 'uuid';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from '../component/Header';

const CustomButton = styled(Button)({
  textTransform: 'none',
  background: 'blue',
  color: '#fff',
  margin: '5px 10px',
})

const DialogStyle = {
  height: '25%',
  width: '35%',
  maxWidth: '100%',
  maxHeight: '100%',
  boxShadow: 'none',
  borderRadius: '10px'
}

const Wrapper = styled(Box)({
  padding: 10,
  margin: 10,
  display: 'flex',
  justifyContent: 'center'
})

function AccessForm() {

  const navigate = useNavigate();

  const [UID, setUID] = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [ID, setID] = useState('');

  const [responseJson, setResponseJson] = useState({
    Id: localStorage.currentId,
    Answers: []
  })

  const [dataList, setDataList] = useState({
    "Id": '',
    "QuestionList": [],
    "FormInfo": {
      "FormInfo": '',
      "FormDescription": ''
    }
  });

  const onSubmitFormClicked = async (e) => {
    e.preventDefault();
    const uid = uuid();
    const uid_reduced = uid.slice(0, 8);
    setID(uid_reduced);
    await axios.post(`http://localhost:5000/save-response`, JSON.stringify({ Id: responseJson.Id, ResponseId: uid_reduced, Answers: responseJson.Answers }), { headers: { 'Content-Type': 'application/json' } });
    setOpen(true);
  }

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/access-form/${localStorage.currentId}`).then(res => res.json()).then(data => {
        if (data === null) {
          return;
        }
        setDataList(data);
        for (let i in data) {
          if (i === "QuestionList") {
            responseJson.Answers = data.QuestionList;
          }
        }
      }).catch(err => console.log(err))
    } catch (error) {
      console.log(error);
    }
  }, [])

  const onValueChange = (e, qNo) => {
    e.preventDefault();
    for (let key in responseJson) {
      if (key === "Answers") {
        responseJson.Answers.map(obj => {
          if (obj.questionNumber === qNo) {
            obj.responseAnswer = e.target.value;
          }
        })
      }
    }
    console.log(responseJson);
  }

  const onOptionSelected = (qNo, a, b, c, d) => {
    let resOption = {
      a: a,
      b: b,
      c: c,
      d: d
    };
    for (let key in responseJson) {
      if (key === "Answers") {
        responseJson.Answers.map(obj => {
          if (obj.questionNumber === qNo) {
            obj.responseOption = resOption;
          }
        })
      }
    }
    console.log(responseJson);
  }

  const redirectToHome = () => {
    navigate('/');
    setOpen(false);
  }

  return (
    <Wrapper>
      <Header />
      <form style={{ marginTop: 64 }}>
        <Typography variant="h4">
          Form ID: {dataList.Id}
        </Typography>
        <Box style={{ margin: '10px 0' }}>
          <Typography variant="h5">
            Form Title: {dataList.FormInfo.FormTitle}
          </Typography>
          <Typography variant="h5">
            Form Description: {dataList.FormInfo.FormDescription}
          </Typography>
        </Box>
        <Box>
          {
            dataList && dataList.QuestionList.map(question => (
              (question.type === 'mcq') ? (
                <Box key={question.id} style={{ margin: '10px 0' }}>
                  <Typography variant="h5">
                    Q{question.questionNumber}.
                    <Typography variant="span">
                      {question.question}
                    </Typography>
                  </Typography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="mcq"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="first" onClick={() => onOptionSelected(question.questionNumber, true, false, false, false)} control={<Radio />} label={question.optionList.a.title} />
                      <FormControlLabel value="second" onClick={() => onOptionSelected(question.questionNumber, false, true, false, false)} control={<Radio />} label={question.optionList.b.title} />
                      <FormControlLabel value="third" onClick={() => onOptionSelected(question.questionNumber, false, false, true, false)} control={<Radio />} label={question.optionList.c.title} />
                      <FormControlLabel value="fourth" onClick={() => onOptionSelected(question.questionNumber, false, false, false, true)} control={<Radio />} label={question.optionList.d.title} />
                    </RadioGroup>
                  </FormControl>
                </Box>
              ) : (
                <Box key={question.id} style={{ margin: '10px 0' }}>
                  <Typography variant="h5" key={question.id}>
                    Q{question.questionNumber}.
                    <Typography variant="span">
                      {question.question}
                    </Typography>
                  </Typography>
                  <TextField id="outlined-basic" label="Enter your answer" style={{margin: '8px 0', width:'100%'}} variant="outlined" onChange={(e) => { onValueChange(e, question.questionNumber) }} />
                </Box>
              )
            ))
          }
        </Box>
        <CustomButton type="submit" style={{ width: '100%' }} onClick={(e) => onSubmitFormClicked(e)}>
          Submit Form
        </CustomButton>
        <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{
          sx: { ...DialogStyle, height: 'auto' }
        }}>
          <Box style={{ background: '#f4f4f4' }}>
            <IconButton style={{ display: 'flex', float: 'right' }}>
              <CloseIcon onClick={() => setOpen(false)} />
            </IconButton>
          </Box>
          <TextField id="outlined-basic" value={ID} label="Form Response ID" variant="outlined" style={{ margin: 10 }} />
          <CustomButton onClick={() => redirectToHome()} style={{ marginBottom: 15 }}>
            Redirect To Home Page
          </CustomButton>
        </Dialog>
      </form>
    </Wrapper>
  )
}

export default AccessForm