// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
// });

// const User = mongoose.models.User  || mongoose.model('User', UserSchema);

// export default User;

import Airtable from 'airtable';

// Initialize Airtable with your API key and base ID
const base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN }).base(
  process.env.AIRTABLE_BASE_NAME,
);

// Define the Airtable schema
const UserSchema = {
  name: String,
  email: String,
  password: String,
};

// Define the User model
const User = {
  create: async (userData) => {
    try {
      // Insert a new record into the Airtable table
      const createdRecord = await base('Users').create(userData);
      return createdRecord;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  // Add other CRUD operations as needed
};

export default User;
