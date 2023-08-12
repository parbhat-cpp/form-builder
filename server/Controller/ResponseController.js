import resp from "../Schema/ResponseSchema.js";

export const uploadResData = (request, response) => {
    try {
        const info = request.body;
        const newData = resp(info);
        newData.save();
        response.status(200).json({ message: 'ok' });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export const getResponseForm = async (request, response) => {
    try {
        const id = request.params.Id;
        const form = await resp.findOne({ 'ResponseId': id });
        response.status(200).json(form);
    } catch (error) {
        response.status(500).json({ error: error.mesage });
    }
}