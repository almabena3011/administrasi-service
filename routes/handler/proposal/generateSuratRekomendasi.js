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

        browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(finalHtml);
        const pdfDir = path.resolve(__dirname, '../../../public/surat_rekomendasi');

        try {
            await fs.access(pdfDir);
        } catch (err) {
            await fs.mkdir(pdfDir);
        }

        const timestamp = new Date().getTime();
        const fileName = `${proposal.nama_mahasiswa.replace(/\s+/g, '_')}_${timestamp}.pdf`;
        const pdfPath = path.join(pdfDir, fileName);

        await page.pdf({ path: pdfPath, format: 'A4' });
        proposal.surat_rekomendasi_path = pdfPath;
        proposal.is_suratrekomendasi_generated = true;
        await proposal.save();

        return res.status(200).json({
            status: 'success',
            data: proposal,
            message: 'Surat rekomendasi berhasil di generate'
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
