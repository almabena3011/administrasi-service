const { BatchDocument } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

const documentSchema = {
    document_title: {
        type: "string",
        empty: false,
        min: 5,
        max: 30,
        messages: {
            stringMin: "Judul dokumen minimal harus 5 karakter",
            stringMax: "Judul dokumen tidak boleh lebih dari 30 karakter"
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
    console.log(req.body, req.file.path);
    const { document_title, document_description, batchId } = req.body;
    const filepath = req.file.path;

    // validate the data
    const check = v.compile(documentSchema);
    const validationResponse = check({ document_title, batchId });

    if (validationResponse !== true) {
        return res.status(400).json({ status: 'error', error: validationResponse[0].message });
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