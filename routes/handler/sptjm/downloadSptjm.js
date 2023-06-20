const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');
const _ = require('lodash');
const { Proposal } = require('../../../models');
const { getMahasiswaById } = require('../userService');

module.exports = async (req, res) => {
    let browser;
    try {
        const id = req.params.id;
        const proposal = await Proposal.findByPk(id);
        console.log(proposal);
        if (!proposal) {
            return res.status(404).json({
                status: 'error',
                message: 'Proposal not found'
            });
        }
        const mahasiswa = await getMahasiswaById(proposal.mahasiswaId);
        console.log(mahasiswa);
        const htmlPath = path.resolve(__dirname, '../../../private/sptjm_template.html');
        const html = await fs.readFile(htmlPath, 'utf-8');

        const template = _.template(html);
        const finalHtml = template({
            nama: proposal.nama_mahasiswa,
            prodi: proposal.prodi,
            nim: proposal.nim,
            nik: proposal.nik,
            no_wa: mahasiswa.no_wa,
            email: mahasiswa.email,
            nama_ot: mahasiswa.nama_ot_ttd,
        });

        browser = await puppeteer.launch({
            headless: 'true',
        });
        const page = await browser.newPage();
        await page.setContent(finalHtml);

        const pdf = await page.pdf({ format: 'A4' });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=SPTJM_${proposal.nama_mahasiswa}.pdf`);
        res.send(pdf);

    } catch (error) {
        console.log(error.message);
        if (error.message === 'Mahasiswa not found') {
            res.status(404).json({
                error: 'Mahasiswa not found'
            });
        } else if (error.message === 'User service is not available') {
            res.status(500).json({ error: 'User service is not available' });
        } else {
            res.status(500).json({ error: error.message });
        }
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
