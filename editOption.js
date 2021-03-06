const { Language } = require("../../../../models/languageModel");
const { Car } = require("../../../../models/Car/carModel");
const { Part } = require("../../../../models/Car/partModel");

const { camelize } = require("../../../camelize/camelize");

exports.editOption = async (req, res) => {
  try {
    const { option, partOptionIndex, ltValue, enValue } = req.body;
    const newName = camelize(enValue);

    // lt
    let language = await Language.findOne({ languageName: "lt" });
    let partOptions = language.partOptions;

    const oldName = partOptions[option].options[partOptionIndex].name;
    const propName = partOptions[option].id;

    partOptions[option].options[partOptionIndex].name = newName;
    partOptions[option].options[partOptionIndex].value = ltValue;
    await Language.updateOne(
      { languageName: "lt" },
      {
        $set: { partOptions: partOptions },
      }
    );
    // en
    language = await Language.findOne({ languageName: "en" });
    partOptions = language.partOptions;
    partOptions[option].options[partOptionIndex].name = newName;
    partOptions[option].options[partOptionIndex].value = enValue;
    await Language.updateOne(
      { languageName: "en" },
      {
        $set: { partOptions: partOptions },
      }
    );

    // embed car
    switch (propName) {
      case "steeringWheelPosition":
      case "drivingWheels":
      case "transmission":
      case "bodyType":
        await Car.updateMany(
          {
            [propName]: oldName,
          },
          { $set: { [propName]: newName } }
        );
        break;
      case "carColor":
        await Car.updateMany(
          {
            color: oldName,
          },
          { $set: { color: newName } }
        );
        break;
      case "fuel":
        await Car.updateMany(
          { "engine.engineFuel": oldName },
          { $set: { "engine.engineFuel": newName } }
        );
        break;
      default:
        break;
    }

    // embed part

    switch (propName) {
      case "fuel":
      case "carColor":
      case "drivingWheels":
      case "transmission":
      case "bodyType":
      case "steeringWheelPosition":
        const place = `car.${propName}`;
        await Part.updateMany(
          { [place]: oldName },
          { $set: { [place]: newName } }
        );
        break;
      case "position":
      case "condition":
      case "status":
        await Part.updateMany(
          { [propName]: oldName },
          { $set: { [propName]: newName } }
        );
        break;
      default:
        break;
    }

    return res.json(partOptions[option].options[partOptionIndex]);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
