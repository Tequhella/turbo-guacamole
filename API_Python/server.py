from flask import Flask, request, jsonify
from flask_graphql import GraphQLView
from flask_cors import CORS
from graphene import ObjectType, String, Schema, List, Field
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# Connection to MongoDB
client = MongoClient('mongodb://root:root@localhost:27017/')
db = client['user_form']
users_collection = db['users']

# Definition of the GraphQL schema
class UserType(ObjectType):
    _id = String()
    firstname = String()
    lastname = String()
    email = String()
    birthdate = String()
    city = String()
    zipcode = String()

# Query to find all users
class getAllUsers(ObjectType):
    all_users = List(UserType)

    def resolve_all_users(self, info):
        return list(users_collection.find())

# Mutation to add a user
class addUser(ObjectType):
    user = Field(UserType,
                 firstname=String(),
                 lastname=String(),
                 email=String(),
                 birthdate=String(),
                 city=String(),
                 zipcode=String())

    def mutate(self, info, **kwargs):
        new_user = {
            "firstname": kwargs.get("firstname"),
            "lastname": kwargs.get("lastname"),
            "email": kwargs.get("email"),
            "birthdate": kwargs.get("birthdate"),
            "city": kwargs.get("city"),
            "zipcode": kwargs.get("zipcode"),
        }
        result = users_collection.insert_one(new_user)
        new_user["_id"] = str(result.inserted_id)
        return CreateUser(user=new_user)

# Mutation to update a user
class updateUser(ObjectType):
    user = Field(UserType,
                 _id=String(),
                 firstname=String(),
                 lastname=String(),
                 email=String(),
                 birthdate=String(),
                 city=String(),
                 zipcode=String())

    def mutate(self, info, _id, **kwargs):
        update_query = {"_id": ObjectId(_id)}
        update_values = {"$set": kwargs}
        users_collection.update_one(update_query, update_values)
        updated_user = users_collection.find_one({"_id": ObjectId(_id)})
        return UpdateUser(user=updated_user)

# Mutation to delete a user
class deleteUser(ObjectType):
    user = Field(UserType, _id=String())

    def mutate(self, info, _id):
        deleted_user = users_collection.find_one_and_delete({"_id": ObjectId(_id)})
        return DeleteUser(user=deleted_user)

# Creation of the global schema
schema = Schema(query=getAllUsers, mutation=addUser)

# GraphQL route configuration
app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

if __name__ == '__main__':
    app.run(debug=True)
