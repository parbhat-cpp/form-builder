import express from 'express';
import cors from 'cors';
import ConnectDB from './Database/db.js';
import { uploadDataReq } from './Controller/QuestionController.js';
import bodyParser from 'body-parser';
import { getForm } from './Controller/FormController.js';
import { uploadResData, getResponseForm } from './Controller/ResponseController.js';
import { downloadPdf } from './Controller/PdfController.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

ConnectDB();
app.post('/save-form', uploadDataReq);
app.get('/access-form/:id', getForm);
app.post('/save-response', uploadResData);
app.get('/response/:Id', getResponseForm);
app.get('/download-pdf', downloadPdf);

app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`);
})