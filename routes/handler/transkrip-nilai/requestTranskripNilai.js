const { Proposal } = require("../../../models");

module.exports = async (req, res) => {
  const id = req.params.id;
  try {
    const proposal = await Proposal.findOne({
      where: {
        id: id,
      },
    });

    if (!proposal) {
      return res.status(404).json({
        status: "error",
        message: "Proposal not found",
      });
    }

    console.log(proposal);
    proposal.transkrip_path = req.file.path;
    proposal.is_transkrip_generated = true;

    await proposal.save();
    return res.status(200).json({
      status: "success",
      message: "Transkrip nilai berhasil diterbitkan",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
