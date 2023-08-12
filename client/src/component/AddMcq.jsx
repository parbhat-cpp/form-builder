import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material"

const Container = styled(Box)({
  margin: 10,
  padding: 10,
  background:'#e3e3e3',
  borderRadius: 10,
  border: 'solid 1px #e3e3e3',
  width: '45vh'
})

function AddMcq({ questionText, count, optionList }) {

  // console.log(optionList);

  return (
    <Container>
      <Typography variant="h5">
        Q{count}.
        <Typography variant="span">
          {
            questionText
          }
        </Typography>
      </Typography>
      {
        optionList.map(option => (
          <Box key={option.id} style={{margin: '10px 0'}}>
            <Typography>
              (a). {option.a.title} [{(option.a.correct === true) ? 'Correct' : 'Not Correct'}]
            </Typography>
            <Typography>
              (b). {option.b.title} [{(option.b.correct === true) ? 'Correct' : 'Not Correct'}]
            </Typography>
            <Typography>
              (c). {option.c.title} [{(option.c.correct === true) ? 'Correct' : 'Not Correct'}]
            </Typography>
            <Typography>
              (d). {option.d.title} [{(option.d.correct === true) ? 'Correct' : 'Not Correct'}]
            </Typography>
          </Box>
        ))
      }
    </Container>
  )
}

export default AddMcq