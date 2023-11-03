import question from "../Schema/QuestionsSchema.js";

const uploadData = (data) => {
  return new Promise((resolve, reject) => {
    const newData = question({
      Id: data.Id,
      QuestionList: data.info,
      FormInfo: data.FormDetails,
      Responses: [],
    });
    newData.save();
    resolve(newData);
  });
};

export const uploadDataReq = async (request, response) => {
  const data = request.body;
  // console.log(data);
  uploadData(data)
    .then((res) => {
      console.log(res);

      response.status(200).json(res);
    })
    .catch((err) => {
      response.status(500).json(err);
    });
};

export const pushResponse = async (request, response) => {
  try {
    const { id, resId } = request.body;
    const data = await question.findOne({ Id: id });
    const dateTimeArr = new Date().toString().split(" ");
    const resData = {
      resId: resId,
      date: `${dateTimeArr[2]} ${dateTimeArr[1]} ${dateTimeArr[3]}`,
      time: `${dateTimeArr[4]}`,
    };
    data.Responses = [...data.Responses, resData];

    await data.save();

    response.json({ response: "ok" });
  } catch (error) {
    response.json({ error: error.message });
  }
};

export const getFormResList = async (request, response) => {
  try {
    const { formid } = request.params;
    const data = await question.findOne({ Id: formid });
    response.status(200).json(data.Responses);
  } catch (error) {
    response.json({ error: error.message });
  }
};
