import styled from "@emotion/styled"
import { Box, Typography } from "@mui/material"

const Container = styled(Box)({
    background: '#e3e3e3',
    width: '45vh',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    border: 'solid 1px #e3e3e3',
})

function AddQuestion({ questionText, count }) {
    return (
        <Container>
            <Typography variant="h5">
                Q{count}.
                <Typography variant="span">
                    {questionText}
                </Typography>
                <Typography style={{ margin: '10px 0', opacity: '0.6' }}>
                    IT WILL TAKE AN ANSWER FROM USER
                </Typography>
            </Typography>
        </Container>
    )
}

export default AddQuestion