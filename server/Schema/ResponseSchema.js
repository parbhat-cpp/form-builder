import mongoose from "mongoose";

const responseSchema = mongoose.Schema({
    Id: String,
    ResponseId: String,
    Answers: Array,
});

const resp = mongoose.model('response', responseSchema);

export default resp;