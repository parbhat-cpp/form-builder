import { Box, IconButton, Dialog, Typography, TextField } from '@mui/material';
import Header from '../component/Header';
import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { InputBase, Button } from '@mui/material';
import axios from 'axios';
import { DataContext } from '../Context/DataProvider';

const Container = styled(Box)({
  height: '100vh',
  width: '100%'
});

const Wrapper = styled(Box)({
  minHeight: '75vh',
  marginTop: 64,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflowY: 'hidden',
});

const IconBtn = styled(IconButton)({
  background: 'blue',
  border: 'solid 2px blue',// #ad7e7e
  borderRadius: 24,
  width: '17%',
  height: 80,
  margin: '0 0 25px 25px',
  '&:hover': {
    '& > svg': {
      color: '#000'
    }
  },
  '& > svg': {
    color: '#fff', // 905555
    fontSize: 26
  }
})

const DialogStyle = {
  height: '35%',
  width: {
    lg: '35%',
    md: '38%',
    sm: '80%',
    xs: '80%'
  },
  boxShadow: 'none',
  borderRadius: '10px 10px 10px 10px',
}

const CustomButton = styled(Button)({
  textTransform: 'none',
  background: 'blue',
  color: '#fff',
  margin: '5px 10px',
})

const FormNameInput = styled(InputBase)({
  display: 'block',
  width: '45vh',
  margin: '10px 0',
  background: '#f4f4f4',
  padding: '10px',
  borderRadius: 14,
})

const ResponseText = styled(Typography)({
  fontSize: 18,
  '&:hover': {
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
})

const BreakPoints = {
  '& > button': {
    width: {
      xs: '35%',
      md: '17%',
      sm: '35%',
      lg: '17%'
    }
  }
}

function Home() {

  const [open, setOpen] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [UID, setUID] = useContext(DataContext);
  const [resDialog, setResDialog] = useState(false);

  const navigate = useNavigate();

  const createForm = () => {
    navigate('/create-form');
  }

  const accessForm = () => {
    const id = document.getElementById('input-id').value;
    // axios.get(`https://ps-forms.onrender.com/access-form/${id}`).then(res => res.data()).then(data => console.log(data)).catch(err => console.log(err))
    fetch(`https://ps-forms.onrender.com/access-form/${id}`).then(res => res.json()).then(data => {
      if (data === null) {
        setOpen(false);
        setErrorDialog(true);
        return;
      }
      setUID(data.Id);
      localStorage.currentId = data.Id;
      navigate(`/access-form/id/${data.Id}`);
    }).catch(err => console.log(err))
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleErrorClose = () => {
    setErrorDialog(false);
  }

  const handleResClose = () => {
    setResDialog(false);
  }

  const redirectToResponseAnalysisPage = () => {
    const resId = document.getElementById("outlined-basic").value;
    fetch(`https://ps-forms.onrender.com/response/${resId}`)
      .then(res => res.json())
      .then(data => {
        if (data === null) {
          setResDialog(false);
          setErrorDialog(true);
          return;
        }
        localStorage.currentResId = resId;
        navigate(`/response/id/${resId}`);
      }).catch(error => console.log(error))
  }

  return (
    <Container>
      <Header />
      <Wrapper sx={BreakPoints}>
        <IconBtn onClick={() => createForm()}>
          <AddIcon />
        </IconBtn>
        <IconBtn onClick={() => setOpen(true)}>
          <LinkIcon />
        </IconBtn>
        <ResponseText onClick={() => setResDialog(true)}>
          Response
        </ResponseText>
      </Wrapper>
      <Dialog open={open} onClose={handleClose} PaperProps={{
        sx: { ...DialogStyle, height: 'auto' }
      }}>
        <>
          <Box style={{ background: '#f4f4f4' }}>
            <IconButton style={{ display: 'flex', float: 'right' }}>
              <CloseIcon onClick={() => setOpen(false)} />
            </IconButton>
          </Box>
          <TextField id="input-id" label="Enter Form Form ID" variant="outlined" required style={{ margin: 10 }} />
          <CustomButton style={{ marginBottom: 15 }} onClick={(e) => accessForm(e)}>
            Open
          </CustomButton>
        </>
      </Dialog>
      <Dialog open={errorDialog} onClose={handleErrorClose} PaperProps={{
        sx: DialogStyle
      }}>
        <>
          <Box style={{ background: '#f4f4f4' }}>
            <IconButton style={{ display: 'flex', float: 'right' }}>
              <CloseIcon onClick={() => setErrorDialog(false)} />
            </IconButton>
          </Box>

        </>
      </Dialog>
      <Dialog open={resDialog} onClose={handleResClose} PaperProps={{
        sx: {
          ...DialogStyle,
          height: 'auto',
        }
      }}>
        <>
          <Box style={{ background: '#f4f4f4' }}>
            <IconButton style={{ display: 'flex', float: 'right' }}>
              <CloseIcon onClick={() => setResDialog(false)} />
            </IconButton>
          </Box>
          <TextField id="outlined-basic" label="Enter Form Response ID" variant="outlined" style={{ margin: 10 }} required/>
          <CustomButton onClick={() => redirectToResponseAnalysisPage()} style={{ marginBottom: 15 }}>
            Open
          </CustomButton>
        </>
      </Dialog>
    </Container>
  )
}

export default Home
