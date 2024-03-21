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
  
  type Admin {
    _id: ID
    username: String
    password: String
    role: String
  }

  type Query {
    getUser(_id: ID!): User
    getAllUsers: [User]
    getAdmin(_id: ID!): Admin
    getAllAdmins: [Admin]
  }

  type Mutation {
    addUser(user: _User): User
    updateUser(user: _User): User
    deleteUser(id: ID!): ID
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

const AdminModel = mongoose.model('Admin', {
  username: String,
  password: String,
  role: String,
});

const root = {
  getUser: ({ _id }) => UserModel.findById(_id),
  getAllUsers: () => UserModel.find(),
  getAdmin: ({ _id }) => AdminModel.findById(_id),
  getAllAdmins: () => AdminModel.find(),
  addUser: (args) => {
    //console.log(args);
    const { firstname, lastname, email, birthdate, city, zipcode } = args.user;
    const newUser = new UserModel({ firstname, lastname, email, birthdate, city, zipcode });
    return newUser.save();
  },
  updateUser: ({ _id, ...args }) => UserModel.findByIdAndUpdate(_id, args, { new: true }),
  deleteUser: async ({ id }) => {
    await UserModel.findByIdAndDelete(id);
    return id;
  }
};

mongoose.connect("mongodb://root:root@localhost:27017/user_form", { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: true, authSource: 'admin' });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Serveur GraphQL en cours d'exécution sur http://localhost:${PORT}/graphql`);
});
