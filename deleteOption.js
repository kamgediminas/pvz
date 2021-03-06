const { Language } = require("../../../../models/languageModel");

exports.deleteOption = async (req, res) => {
  try {
    const { option, partOptionIndex } = req.body;

    // lt
    let language = await Language.findOne({ languageName: "lt" });
    let partOptions = language.partOptions;
    partOptions[option].options.splice(partOptionIndex, 1);
    await Language.updateOne(
      { languageName: "lt" },
      {
        $set: { partOptions: partOptions },
      }
    );

    // en
    language = await Language.findOne({ languageName: "en" });
    partOptions = language.partOptions;
    partOptions[option].options.splice(partOptionIndex, 1);
    await Language.updateOne(
      { languageName: "en" },
      {
        $set: { partOptions: partOptions },
      }
    );

    return res.json(partOptions);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
