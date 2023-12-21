const express = require('express');
require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
// app.use(express.json());

// async function connectDb() {
//   const uri = 'mongodb+srv://baris:6849358bt@cluster0.0noydrj.mongodb.net/merngraph_db?retryWrites=true&w=majority';
//   try {
//     await mongoose.connect(uri, {});
//   } catch (error) {
//     console.log(error);
//   }
// }
// connectDb();

// app.get('/', (req, res) => {
//   res.send('Home Page');
// });

connectDB();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: false
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
