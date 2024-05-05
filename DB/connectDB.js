// import mongoose from 'mongoose';

// // connecting to database
// const connectDB = async () => {
//     const connectionUrl = process.env.DB_URI;
//     mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//         .then(() => console.log(`Database connected successfully`))
//         .catch((err) => console.log("Getting Error from DB connection" + err.message))
//     mongoose.set('strictQuery', false);
// };

// export default connectDB;

import Airtable from "airtable";

console.log("process.env.AIRTABLE_BASE_NAME");
console.log(process.env.AIRTABLE_BASE_NAME);

// Initialize Airtable with your API key and base ID
export const base = new Airtable({
  apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE_NAME);

// Connect to Airtable database
const connectDB = async () => {
  try {
    // Perform a simple query to check if the connection is successful
    await base("Users")
      .select({
        maxRecords: 1,
        view: "Grid view",
      })
      .firstPage();

    console.log("**** Database connected successfully ****");
  } catch (error) {
    console.error("Error connecting to Airtable:", error.message);
  }
};

export default connectDB;
