import {
  Box,
  IconButton,
  Dialog,
  Typography,
  TextField,
  Tooltip,
} from "@mui/material";
import Header from "../component/Header";
import AddIcon from "@mui/icons-material/Add";
import LinkIcon from "@mui/icons-material/Link";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { DataContext } from "../Context/DataProvider";
import { SERVER_URL } from "../constants";

const Container = styled(Box)({
  height: "100vh",
  width: "100%",
});

const Wrapper = styled(Box)({
  minHeight: "70vh",
  marginTop: 64,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflowY: "hidden",
});

const IconBtn = styled(IconButton)({
  background: "blue",
  border: "solid 2px blue", // #ad7e7e
  borderRadius: 24,
  width: "17%",
  height: 80,
  margin: "0 0 25px 25px",
  "&:hover": {
    "& > svg": {
      color: "#000",
    },
  },
  "& > svg": {
    color: "#fff", // 905555
    fontSize: 26,
  },
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

const CustomButton = styled(Button)({
  textTransform: "none",
  background: "blue",
  color: "#fff",
  margin: "5px 10px",
});

const ResponseText = styled(Typography)({
  fontSize: 18,
  textDecoration: "underline",
  "&:hover": {
    color: "blue",
    textDecoration: "underline",
    cursor: "pointer",
  },
});

const BreakPoints = {
  "& > button": {
    width: {
      xs: "35%",
      md: "17%",
      sm: "35%",
      lg: "17%",
    },
  },
};

const Query = styled(Box)({
  background: "#f4f4f4",
  margin: "10px 5px",
  padding: 10,
  borderRadius: 14,
});

function Home() {
  const [open, setOpen] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [UID, setUID] = useContext(DataContext);

  const navigate = useNavigate();

  const createForm = () => {
    navigate("/create-form");
  };

  const accessForm = () => {
    const id = document.getElementById("input-id").value;
    fetch(`${SERVER_URL}/access-form/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data === null) {
          setOpen(false);
          setErrorDialog(true);
          return;
        }
        setUID(data.Id);
        localStorage.currentId = data.Id;
        navigate(`/access-form/id/${data.Id}`);
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleErrorClose = () => {
    setErrorDialog(false);
  };

  return (
    <Container>
      <Header />
      <Wrapper sx={BreakPoints}>
        <Tooltip title="Form Creation">
          <IconBtn onClick={() => createForm()}>
            <AddIcon />
          </IconBtn>
        </Tooltip>
        <Tooltip title="Form Response">
          <IconBtn onClick={() => setOpen(true)}>
            <LinkIcon />
          </IconBtn>
        </Tooltip>
        <Tooltip title="See Lists of Response on your Form">
          <ResponseText onClick={() => navigate("/response/list")}>
            Response List
          </ResponseText>
        </Tooltip>
      </Wrapper>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { ...DialogStyle, height: "auto" },
        }}
      >
        <>
          <Box style={{ background: "#f4f4f4" }}>
            <IconButton style={{ display: "flex", float: "right" }}>
              <CloseIcon onClick={() => setOpen(false)} />
            </IconButton>
          </Box>
          <TextField
            id="input-id"
            label="Enter Form ID"
            variant="outlined"
            required
            style={{ margin: 10 }}
          />
          <CustomButton
            style={{ marginBottom: 15 }}
            onClick={(e) => accessForm(e)}
          >
            Open
          </CustomButton>
        </>
      </Dialog>
      <Dialog
        open={errorDialog}
        onClose={handleErrorClose}
        PaperProps={{
          sx: { ...DialogStyle },
        }}
      >
        <>
          <Box style={{ background: "#f4f4f4" }}>
            <IconButton style={{ display: "flex", float: "right" }}>
              <CloseIcon onClick={() => setErrorDialog(false)} />
            </IconButton>
          </Box>
          <Typography variant="h3" style={{ textAlign: "center" }}>
            ERROR ID not found
          </Typography>
        </>
      </Dialog>
    </Container>
  );
}

export default Home;
