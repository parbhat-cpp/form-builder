import question from "../Schema/QuestionsSchema.js";

export const getForm = async (request, response) => {
  try {
    const id = request.params.id;
    const form = await question.findOne({ Id: id }, "-Responses");
    response.status(200).json(form);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
