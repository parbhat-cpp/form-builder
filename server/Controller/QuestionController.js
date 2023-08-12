import question from "../Schema/QuestionsSchema.js";

const uploadData = (data) => {
    return new Promise((resolve, reject) => {
        // const data = request.body;
        // console.log('post');
        // console.log(data);
        // const newData = question({ data: data });
        const newData = question({Id: data.Id, QuestionList: data.info, FormInfo: data.FormDetails})
        newData.save();
        resolve(newData);
    })
}

export const uploadDataReq = async (request, response) => {
    // try {
    //     const data = request.body;
    //     console.log('post');
    //     console.log(data);
    //     const newData = question({data: data});
    //     await newData.save();
    //     response.status(200).json(data);
    // } catch (error) {
    //     response.status(500).json(error);
    // }

    const data = request.body;
    // console.log(data);
    uploadData(data).then(res => {
        console.log(res);

        response.status(200).json(res);
    }).catch(err => {
        response.status(500).json(err);
    })
}