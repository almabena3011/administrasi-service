const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');
const _ = require('lodash');
const { Proposal } = require('../../../models');

module.exports = async (req, res) => {
    let browser;
    try {
        // const id = req.params.id;
        // const proposal = await Proposal.findByPk(id);
        // if (!proposal) {
        //     return res.status(404).json({
        //         status: 'error',
        //         message: 'Proposal not found'
        //     });
        // }

        const htmlPath = path.resolve(__dirname, '../../../private/sr_template.html');
        const html = await fs.readFile(htmlPath, 'utf-8');

        const template = _.template(html);
        const finalHtml = template({
            fullname: "test",
            nik: "test",
            nim: "test",
            prodi: "test",
            current_semester: "test",
            ipk: "test",
            total_sks: "test"
        });

        browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(finalHtml);

        const pdf = await page.pdf({ format: 'A4' });

        // Set headers and send the PDF to client
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${proposal.nama_mahasiswa.replace(/\s+/g, '_')}.pdf`);
        res.send(pdf);

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}