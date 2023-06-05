const { BatchDocument } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

const documentSchema = {
    document_title: {
        type: "string",
        empty: false,
        min: 15,
        max: 60,
        messages: {
            stringMin: "The document title should have at least 15 words.",
            stringMax: "The document title should have no more than 60 words."
        }
    },
    batchId: {
        type: "number",
        integer: true,
        positive: true,
        convert: true,
        messages: {
            number: "Batch ID must be a number.",
            required: "Batch ID is required."
        }
    }
}

module.exports = async (req, res) => {

    const { document_title, document_description, batchId } = req.body;
    const filepath = req.file.path;

    // validate the data
    const check = v.compile(documentSchema);
    const validationResponse = check({ document_title, batchId });

    if (validationResponse !== true) {
        return res.status(400).json({ status: 'error', error: validationResponse });
    }

    try {
        const batch_document = await BatchDocument.create({
            batchId: batchId,
            document_title: document_title,
            document_description: document_description,
            document_path: filepath,
        });

        res.status(201).json({
            status: 'success',
            data: batch_document
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}