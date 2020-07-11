const Pin = require("../models/Pin");

exports.createPin = async (req, res, next) => {
  const {
    title,
    description,
    image,
    link,
    author,
    category,
    isActive,
  } = req.body;

  try {
    const pin = new Pin({
      title,
      description,
      image,
      link,
      author,
      category,
      isActive,
    });
    await pin.save();

    return res.status(201).json({ data: pin });
  } catch (error) {
    console.error("CREATE PIN", error);
    return res.status(500).json({ error: `Error creating pin ${title}` });
  }
};

exports.getPins = async (req, res, next) => {
  try {
    const pins = await Pin.find();
    return res.status(200).json({ data: pins });
  } catch (error) {
    console.error("GET PINS", error);
    return res.status(500).json({ error: `Error getting pins` });
  }
};
