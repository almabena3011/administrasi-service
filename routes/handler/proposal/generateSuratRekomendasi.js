const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const mammoth = require('mammoth');
const _ = require('lodash');
const { Proposal } = require('../../../models');

module.exports = async (req, res) => {
    let browser;
    try {
        const id = req.params.id;
        const proposal = await Proposal.findByPk(id);
        if (!proposal) {
            res.status(404).json({
                status: 'erorr',
                message: 'Proposal not found'
            });
        }

        let html;
        const docPath = path.resolve(__dirname, '../../../public/surat_rekomendasi_template.docx');
        console.log('docPATH', docPath);
        try {
            const result = await mammoth.convertToHtml({ path: docPath });
            html = result.value;

        } catch (error) {
            console.error('Failed to convert Word to HTML', error);
            return res.status(500).json({ message: "Failed to convert Word to HTML." });
        }


        // compile the template and replace placeholders with data
        const template = _.template('hello <%= user %>!');
        console.log(template);
        const finalHtml = template({
            user: "Albet",
        });
        console.log(finalHtml);
        // generate PDF
        // try {
        //     browser = await puppeteer.launch({
        //         headless: 'new',
        //     });
        //     const page = await browser.newPage();
        //     await page.setContent(finalHtml);
        //     const pdfDir = 'pdfs';
        //     if (!fs.existsSync(pdfDir)) {
        //         fs.mkdirSync(pdfDir);
        //     }
        //     const pdfPath = `${pdfDir}/${proposal.id}.pdf`;
        //     await page.pdf({ path: pdfPath, format: 'A4' });
        //     proposal.surat_rekomendasi_path = pdfPath;
        // } catch (error) {
        //     console.error('Failed to generate PDF', error);
        //     return res.status(500).json({ message: "Failed to generate PDF." });
        // }


        res.status(200).json({
            status: 'success',
            data: proposal,
            message: 'Proposal berhasil disetujui'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}