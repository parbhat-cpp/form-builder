import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import Header from "../component/Header";
import { useNavigate } from "react-router-dom";


const res = {
    "_id": "64d51ca799f6a25fa1c7edfc",
    "Id": "53edd01e",
    "ResponseId": "966ea389",
    "Answers": [
        {
            "type": "question",
            "question": "How are you?",
            "questionNumber": 1,
            "responseAnswer": "geddds"
        },
        {
            "type": "mcq",
            "question": "How was your day?",
            "questionNumber": 2,
            "optionList": {
                "a": {
                    "title": "Good",
                    "correct": false
                },
                "b": {
                    "title": "Fine",
                    "correct": false
                },
                "c": {
                    "title": "Doesn't matter",
                    "correct": true
                },
                "d": {
                    "title": "nnnn",
                    "correct": false
                }
            },
            "responseOption": {
                "a": false,
                "b": false,
                "c": true,
                "d": false
            }
        }
    ],
    "__v": 0
}

const Container = styled(Box)({
    display: 'flex',
    justifyContent: 'center'
})

const CustomButton = styled(Button)({
    textTransform: 'none',
    background: 'blue',
    color: '#fff',
    margin: '5px 10px',
    width: '100%'
})

const ButtonWrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
})

function ResponseAnalysis() {

    const [dataList, setDataList] = useState({
        "Id": '',
        "ResponseId": '',
        'Answers': []
    });

    const navigate = useNavigate();

    useEffect(() => {
        try {
            fetch(`http://localhost:5000/response/${localStorage.currentResId}`)
                .then(res => res.json())
                .then(data => {
                    if (data === null) {
                        return;
                    }
                    setDataList(data);
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <Container>
            <Header />
            <Box style={{ marginTop: 64 }}>
                <Box style={{ margin: '10px 0' }}>
                    <Typography variant="h5">
                        Form ID: {dataList.Id}
                    </Typography>
                    <Typography variant="h5">
                        Response ID: {dataList.ResponseId}
                    </Typography>
                </Box>
                <Box>
                    {
                        dataList && dataList.Answers.map(element => (
                            (element.type === 'mcq') ? (
                                <Box key={element} style={{ margin: '10px 0' }}>
                                    <Typography variant="h5">
                                        Q{element.questionNumber}.
                                        <Typography variant="span">
                                            {element.question}
                                        </Typography>
                                    </Typography>
                                    <Box>
                                        <Typography variant="h6">(a). {element.optionList.a.title} {(element.responseOption.a === true) ? (`(Selected & ${(element.optionList.a.correct && element.responseOption.a)})`) : ('')}</Typography>
                                        <Typography variant="h6">(b). {element.optionList.b.title} {(element.responseOption.b === true) ? (`(Selected & ${(element.optionList.b.correct && element.responseOption.b)})`) : ('')}</Typography>
                                        <Typography variant="h6">(c). {element.optionList.c.title} {(element.responseOption.c === true) ? (`(Selected & ${(element.optionList.c.correct && element.responseOption.c)})`) : ('')}</Typography>
                                        <Typography variant="h6">(d). {element.optionList.d.title} {(element.responseOption.d === true) ? (`(Selected & ${(element.optionList.d.correct && element.responseOption.d)})`) : ('')}</Typography>
                                    </Box>
                                </Box>
                            ) : (
                                <Box key={element} style={{ margin: '10px 0' }}>
                                    <Typography variant="h5">
                                        Q{element.questionNumber}.
                                        <Typography variant="span">
                                            {element.question}
                                        </Typography>
                                    </Typography>
                                    <Box>
                                        <Typography variant="h6">
                                            Your answers: {element.responseAnswer}
                                        </Typography>
                                    </Box>
                                </Box>
                            )
                        ))
                    }
                </Box>
                <ButtonWrapper>
                    <CustomButton onClick={() => navigate('/')}>
                        Redirect to Home Page
                    </CustomButton>
                    {/* <CustomButton>
                        Download as PDF
                    </CustomButton> */}
                </ButtonWrapper>
            </Box>
        </Container>
    )
}

export default ResponseAnalysis