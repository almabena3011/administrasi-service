const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');
const _ = require('lodash');
const { Proposal } = require('../../../models');

module.exports = async (req, res) => {
    let browser;
    try {
        const id = req.params.id;
        const proposal = await Proposal.findByPk(id);
        if (!proposal) {
            return res.status(404).json({
                status: 'error',
                message: 'Proposal not found'
            });
        }

        const htmlPath = path.resolve(__dirname, '../../../private/sr_template.html');
        const html = await fs.readFile(htmlPath, 'utf-8');

        const template = _.template(html);
        const finalHtml = template({
            fullname: proposal.nama_mahasiswa,
            nik: proposal.nik,
            nim: proposal.nim,
            prodi: proposal.prodi,
            current_semester: proposal.current_semester,
            ipk: proposal.ipk,
            total_sks: proposal.sks_total
        });

        browser = await puppeteer.launch({
            headless: 'true',
        });
        const page = await browser.newPage();
        await page.setContent(finalHtml);

        const pdf = await page.pdf({ format: 'A4' });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=SuratRekomendasi_${proposal.nama_mahasiswa}.pdf`);
        res.send(pdf);

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}