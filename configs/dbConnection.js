const { default: mongoose } = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGOOSE_CONNECTION);
    if (connect) {
      console.log(`Connected to database succesfully`);
    }
  } catch (error) {
    console.log(`Error in connection to database: ${error}`);
  }
};

module.exports = connectDb;
