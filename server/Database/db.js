import mongoose from "mongoose";

const ConnectDB = async () => {
    const URL = `mongodb+srv://admin:admin@cluster0.h1kegui.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL);
        console.log('connected db');
    } catch (error) {
        console.log(error);
    }
}

export default ConnectDB;