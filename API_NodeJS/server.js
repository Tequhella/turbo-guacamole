const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const { buildSchema } = require('graphql');
const cors = require('cors');
const bodyParser = require("body-parser");
var { ruruHTML } = require("ruru/server")
var { createHandler } = require("graphql-http/lib/use/express")

const schema = buildSchema(`
  type User {
    _id: ID
    firstname: String
    lastname: String
    email: String
    birthdate: String
    city: String
    zipcode: String
  }

  input _User {
    firstname: String
    lastname: String
    email: String
    birthdate: String
    city: String
    zipcode: String
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
  }

  type Mutation {
    addUser(user: _User): User
    updateUser(user: _User): User
    deleteUser(id: ID!): User
  }
`);

const UserModel = mongoose.model('User', {
  firstname: String,
  lastname: String,
  email: String,
  birthdate: String,
  city: String,
  zipcode: String,
});

const root = {
  getUser: ({ id }) => UserModel.findById(id),
  getAllUsers: () => UserModel.find(),
  addUser: (args) => {
    console.log(args);
    const { firstname, lastname, email, birthdate, city, zipcode } = args.user;
    const newUser = new UserModel({ firstname, lastname, email, birthdate, city, zipcode });
    return newUser.save();
  },
  updateUser: ({ id, ...args }) => UserModel.findByIdAndUpdate(id, args, { new: true }),
  deleteUser: ({ id }) => UserModel.findByIdAndRemove(id),
};

mongoose.connect("mongodb://root:root@localhost:27017/user_form", { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: true, authSource: 'admin' });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//app.all(
//  "/graphql",
//  createHandler({
//    schema: schema,
//    rootValue: root,
//  })
//)

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true, // Pour utiliser l'interface graphique GraphQL
}));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur GraphQL en cours d'exécution sur http://localhost:${PORT}/graphql`);
});
