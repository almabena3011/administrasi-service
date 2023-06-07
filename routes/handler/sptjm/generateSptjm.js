const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');
const _ = require('lodash');
const { Sptjm } = require('../../../models');

module.exports = async (req, res) => {
    let browser;
    try {
        const id = req.params.id;
        const sptjm = await Sptjm.findByPk(id);
        if (!sptjm) {
            return res.status(404).json({
                status: 'error',
                message: 'Sptjm not found'
            });
        }

        const htmlPath = path.resolve(__dirname, '../../../private/sptjm_template.html');
        const html = await fs.readFile(htmlPath, 'utf-8');

        const template = _.template(html);
        const finalHtml = template({
            nama: sptjm.nama_lengkap,
            prodi: sptjm.prodi,
            nim: sptjm.nim,
            nik: sptjm.nik,
            no_wa: sptjm.no_wa,
            email: sptjm.email,
            nama_ot: sptjm.nama_ot_ttd,
        });

        browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(finalHtml);
        const pdfDir = path.resolve(__dirname, '../../../public/sptjm');

        try {
            await fs.access(pdfDir);
        } catch (err) {
            await fs.mkdir(pdfDir);
        }

        const timestamp = new Date().getTime();
        const fileName = `${sptjm.nama_lengkap.replace(/\s+/g, '_')}_${timestamp}.pdf`;
        const pdfPath = path.join(pdfDir, fileName);

        await page.pdf({ path: pdfPath, format: 'A4' });
        sptjm.sptjm_path = pdfPath;
        sptjm.status = 'Diterbitkan';
        await sptjm.save();

        return res.status(200).json({
            status: 'success',
            data: sptjm,
            message: 'SPTJM berhasil di generate'
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
