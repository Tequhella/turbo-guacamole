from flask import Flask
from flask_graphql import GraphQLView
from flask_cors import CORS
from graphql import (
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLField,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInputObjectType,
    GraphQLArgument,
    GraphQLInputObjectField,
)
from graphql.execution.executors.asyncio import AsyncioExecutor
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

user_type = GraphQLObjectType(
    name="User",
    fields={
        "_id": GraphQLField(GraphQLID),
        "firstname": GraphQLField(GraphQLString),
        "lastname": GraphQLField(GraphQLString),
        "email": GraphQLField(GraphQLString),
        "birthdate": GraphQLField(GraphQLString),
        "city": GraphQLField(GraphQLString),
        "zipcode": GraphQLField(GraphQLString),
    },
)

user_input_type = GraphQLInputObjectType(
    name="_User",
    fields={
        "firstname": GraphQLInputObjectField(GraphQLString),
        "lastname": GraphQLInputObjectField(GraphQLString),
        "email": GraphQLInputObjectField(GraphQLString),
        "birthdate": GraphQLInputObjectField(GraphQLString),
        "city": GraphQLInputObjectField(GraphQLString),
        "zipcode": GraphQLInputObjectField(GraphQLString),
    },
)

def resolve_get_user(_, info, id):
    return user_collection.find_one({"_id": id})

def resolve_get_all_users(_, info):
    return list(user_collection.find())

def resolve_add_user(_, info, user):
    new_user = user_collection.insert_one(user)
    return user_collection.find_one({"_id": new_user.inserted_id})

def resolve_update_user(_, info, id, user):
    user_collection.update_one({"_id": id}, {"$set": user})
    return user_collection.find_one({"_id": id})

def resolve_delete_user(_, info, id):
    deleted_user = user_collection.find_one({"_id": id})
    user_collection.delete_one({"_id": id})
    return deleted_user

query_type = GraphQLObjectType(
    name="Query",
    fields={
        "getUser": GraphQLField(user_type, args={"id": GraphQLArgument(GraphQLID)}, resolver=resolve_get_user),
        "getAllUsers": GraphQLField(GraphQLList(user_type), resolver=resolve_get_all_users),
    },
)

mutation_type = GraphQLObjectType(
    name="Mutation",
    fields={
        "addUser": GraphQLField(user_type, args={"user": GraphQLArgument(user_input_type)}, resolver=resolve_add_user),
        "updateUser": GraphQLField(user_type, args={"id": GraphQLArgument(GraphQLID), "user": GraphQLArgument(user_input_type)}, resolver=resolve_update_user),
        "deleteUser": GraphQLField(user_type, args={"id": GraphQLArgument(GraphQLID)}, resolver=resolve_delete_user),
    },
)

schema = GraphQLSchema(query=query_type, mutation=mutation_type)

client = MongoClient("mongodb://root:root@localhost:27017/")
db = client["user_form"]
user_collection = db["users"]

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True, executor=AsyncioExecutor()))

if __name__ == '__main__':
    app.run(debug=True, port=5000)

