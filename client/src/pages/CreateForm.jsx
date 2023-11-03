import styled from "@emotion/styled";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  InputBase,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import Header from "../component/Header";
import AddQuestion from "../component/AddQuestion";
import AddMcq from "../component/AddMcq";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../constants";

const Container = styled(Box)({
  padding: 10,
  margin: 10,
  textAlign: "center",
  "& > h3": {
    textAlign: "center",
  },
});

const ButtonWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

const CustomButton = styled(Button)({
  textTransform: "none",
  background: "blue",
  color: "#fff",
  margin: "5px 10px",
});

const FormNameInput = styled(InputBase)({
  display: "block",
  width: "45vh",
  margin: "10px 0",
  background: "#f4f4f4",
  padding: "10px",
  borderRadius: 14,
});

const QuestionsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  textAlign: "center",
});

const DialogStyle = {
  height: "35%",
  width: {
    lg: "35%",
    md: "38%",
    sm: "80%",
    xs: "80%",
  },
  boxShadow: "none",
  borderRadius: "10px 10px 10px 10px",
};

const LinkDialog = {
  height: "25%",
  width: {
    lg: "35%",
    md: "38%",
    sm: "80%",
    xs: "80%",
  },
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  borderRadius: "10px",
};

function CreateForm() {
  const navigate = useNavigate();

  const [openLink, setOpenLink] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(1);
  const [isMcq, setIsMcq] = useState(false);
  const [sentence, setSentence] = useState("");
  const [open, setOpen] = useState(false);
  const [ID, setID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let options = {
    a: {
      title: "",
      correct: false,
    },
    b: {
      title: "",
      correct: false,
    },
    c: {
      title: "",
      correct: false,
    },
    d: {
      title: "",
      correct: false,
    },
  };

  const saveForm = async (e) => {
    e.preventDefault();
    if (!(questions.length > 0)) {
      alert("ADD QUESTIONS");
      return;
    }
    const a1 = document.getElementById("form-title").value;
    const a2 = document.getElementById("form-description").value;
    if (a1 !== "" && a1 !== undefined && a2 !== "" && a2 !== undefined) {
      setIsLoading(true);
      const uid = uuid();
      const uid_reduced = uid.slice(0, 8);
      setID(uid_reduced);
      console.log(questions);
      await axios.post(
        `${SERVER_URL}/save-form`,
        JSON.stringify({
          Id: uid_reduced,
          info: questions,
          FormDetails: { FormTitle: a1, FormDescription: a2 },
        }),
        { headers: { "Content-Type": "application/json" } }
      );
      setIsLoading(false);
      setOpenLink(true);
    } else {
      alert("Please enter a title or description");
    }
  };

  const onAddQuestionClicked = () => {
    setIsMcq(false);
    setOpen(true);
  };

  const onAddMcqClicked = () => {
    setIsMcq(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickDone = (e) => {
    e.preventDefault();
    setQuestionCount(questionCount + 1);
    if (isMcq === true) {
      options.a.title = document.getElementById("rbtn-first").value;
      options.b.title = document.getElementById("rbtn-second").value;
      options.c.title = document.getElementById("rbtn-third").value;
      options.d.title = document.getElementById("rbtn-fourth").value;
      setQuestions([
        ...questions,
        {
          type: "mcq",
          question: sentence,
          questionNumber: questionCount,
          optionList: options,
        },
      ]);
    } else {
      setQuestions([
        ...questions,
        { type: "question", question: sentence, questionNumber: questionCount },
      ]);
    }
    setOpen(false);
  };

  const onValueChange = (e) => {
    e.preventDefault();
    setSentence(e.target.value);
  };

  const redirectHome = () => {
    setOpenLink(false);
    navigate("/");
  };

  return (
    <Container>
      <Header />
      <Typography variant="h3" style={{ marginTop: 64 }}>
        Create a form
      </Typography>
      <form>
        <QuestionsContainer>
          <FormNameInput id="form-title" placeholder="Title of form" required />
          <FormNameInput
            id="form-description"
            placeholder="Description of form"
            required
          />
          {questions.map((que) =>
            que.type === "mcq" ? (
              <AddMcq
                key={que.id}
                questionText={que.question}
                count={que.questionNumber}
                optionList={[...[], que.optionList]}
              />
            ) : (
              <AddQuestion
                key={que.id}
                questionText={que.question}
                count={que.questionNumber}
              />
            )
          )}
        </QuestionsContainer>
        <ButtonWrapper>
          <CustomButton onClick={() => onAddQuestionClicked()}>
            Add a question
          </CustomButton>
          <CustomButton onClick={() => onAddMcqClicked()}>Add MCQ</CustomButton>
        </ButtonWrapper>
        <CustomButton type="submit" onClick={(e) => saveForm(e)}>
          Save Form
        </CustomButton>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: { ...DialogStyle, height: "auto" },
          }}
        >
          {isMcq === true ? (
            <>
              <Box style={{ background: "#f4f4f4" }}>
                <IconButton style={{ display: "flex", float: "right" }}>
                  <CloseIcon onClick={() => setOpen(false)} />
                </IconButton>
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  style={{ margin: "10px 0", width: "95%" }}
                  id="outlined-basic"
                  label="Enter your question"
                  variant="outlined"
                  onChange={(e) => onValueChange(e)}
                  required
                />
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      value="first"
                      name="first-option"
                      onClick={() => {
                        for (let i in options) {
                          options[i].correct = false;
                        }
                        options.a.correct = true;
                      }}
                      control={<Radio />}
                      label={
                        <InputBase id="rbtn-first" placeholder="First option" />
                      }
                    />
                    <FormControlLabel
                      value="second"
                      name="second-option"
                      onClick={() => {
                        for (let i in options) {
                          options[i].correct = false;
                        }
                        options.b.correct = true;
                      }}
                      control={<Radio />}
                      label={
                        <InputBase
                          id="rbtn-second"
                          placeholder="Second option"
                        />
                      }
                    />
                    <FormControlLabel
                      value="third"
                      name="third-option"
                      onClick={() => {
                        for (let i in options) {
                          options[i].correct = false;
                        }
                        options.c.correct = true;
                      }}
                      control={<Radio />}
                      label={
                        <InputBase id="rbtn-third" placeholder="Third option" />
                      }
                    />
                    <FormControlLabel
                      value="fourth"
                      name="fourth-option"
                      onClick={() => {
                        for (let i in options) {
                          options[i].correct = false;
                        }
                        options.d.correct = true;
                      }}
                      control={<Radio />}
                      label={
                        <InputBase
                          id="rbtn-fourth"
                          placeholder="Fourth option"
                        />
                      }
                    />
                  </RadioGroup>
                </FormControl>
                <CustomButton
                  style={{ width: "95%", marginBottom: 10 }}
                  onClick={(e) => onClickDone(e)}
                >
                  Done
                </CustomButton>
              </Box>
            </>
          ) : (
            <>
              <Box style={{ background: "#f4f4f4" }}>
                <IconButton style={{ display: "flex", float: "right" }}>
                  <CloseIcon onClick={() => setOpen(false)} />
                </IconButton>
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  style={{ margin: "10px 0", width: "95%" }}
                  id="outlined-basic"
                  label="Enter your question"
                  onChange={(e) => onValueChange(e)}
                  required
                />
                <CustomButton
                  style={{ marginBottom: 10, width: "95%" }}
                  onClick={(e) => onClickDone(e)}
                >
                  Done
                </CustomButton>
              </Box>
            </>
          )}
        </Dialog>
      </form>
      <Dialog
        open={openLink}
        onClose={() => setOpenLink(false)}
        PaperProps={{
          sx: { ...LinkDialog, height: "auto" },
        }}
      >
        <Box style={{ background: "#f4f4f4" }}>
          <IconButton style={{ display: "flex", float: "right" }}>
            <CloseIcon onClick={() => setOpen(false)} />
          </IconButton>
        </Box>
        <TextField
          id="outlined-basic"
          value={ID}
          label="Form ID"
          variant="outlined"
          style={{ margin: 10 }}
        />
        <CustomButton
          onClick={() => redirectHome()}
          style={{ marginBottom: 15 }}
        >
          Redirect To Home Page
        </CustomButton>
      </Dialog>

      <Dialog
        open={isLoading}
        PaperProps={{
          sx: {
            padding: "20px 40px",
          },
        }}
      >
        <CircularProgress color="primary" />
      </Dialog>
    </Container>
  );
}

export default CreateForm;
