const Pin = require("../models/Pin");

module.exports = {
  Query: {
    async pins(root, args, context) {
      try {
        const pins = await Pin.find();
        return pins;
      } catch (error) {
        console.error("GET PINS", error);
        throw new Error(`Error getting pins`);
      }
    },
  },
  Mutation: {
    async createPin(_, { pin }) {
      const {
        title,
        description,
        image,
        link,
        author,
        category,
        isActive,
      } = pin;

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

        return pin;
      } catch (error) {
        console.error("CREATE PIN", error);
        throw new Error(`Error creating pin ${title}`);
      }
    },
  },
};
