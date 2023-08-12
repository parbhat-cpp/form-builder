import question from "../Schema/QuestionsSchema.js";

export const getForm = async (request, response) => {
    try {
        const id = request.params.id;
        // console.log(id);
        const form = await question.findOne({ 'Id': id });
        response.status(200).json(form);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}