const { Language } = require("../../../../models/languageModel");
const { camelize } = require("../../../camelize/camelize");

exports.addOption = async (req, res) => {
  try {
    const { option, ltValue, enValue } = req.body;

    const name = camelize(enValue);

    // lt
    let language = await Language.findOne({ languageName: "lt" });
    let partOptions = language.partOptions;
    let options = partOptions[option].options;
    options.splice(-1, 0, { name, value: ltValue });
    await Language.updateOne(
      { languageName: "lt" },
      {
        $set: { partOptions: partOptions },
      }
    );

    // en
    language = await Language.findOne({ languageName: "en" });
    partOptions = language.partOptions;
    options = partOptions[option].options;
    options.splice(-1, 0, { name, value: enValue });
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
