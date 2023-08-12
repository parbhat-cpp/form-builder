import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    Id: String,
    QuestionList: Array,
    FormInfo: Object
});

const question = mongoose.model('question', questionSchema);

export default question;