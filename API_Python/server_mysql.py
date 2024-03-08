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
import mysql.connector

app = Flask(__name__)
CORS(app)

user_type = GraphQLObjectType(
    name="User",
    fields={
        "id": GraphQLField(GraphQLID),
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

db = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="user_form"
)
cursor = db.cursor()

def resolve_get_user(_, info, id):
    cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
    return cursor.fetchone()

def resolve_get_all_users(_, info):
    cursor.execute("SELECT * FROM users")
    return cursor.fetchall()

def resolve_add_user(_, info, user):
    cursor.execute("INSERT INTO users (firstname, lastname, email, birthdate, city, zipcode) VALUES (%s, %s, %s, %s, %s, %s)", (user["firstname"], user["lastname"], user["email"], user["birthdate"], user["city"], user["zipcode"]))
    db.commit()
    cursor.execute("SELECT * FROM users WHERE id = %s", (cursor.lastrowid,))
    return cursor.fetchone()

def resolve_update_user(_, info, id, user):
    cursor.execute("UPDATE users SET firstname = %s, lastname = %s, email = %s, birthdate = %s, city = %s, zipcode = %s WHERE id = %s", (user["firstname"], user["lastname"], user["email"], user["birthdate"], user["city"], user["zipcode"], id))
    db.commit()
    return id

def resolve_delete_user(_, info, id):
    cursor.execute("DELETE FROM users WHERE id = %s", (id,))
    db.commit()
    return id

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
        "updateUser": GraphQLField(GraphQLID, args={"id": GraphQLArgument(GraphQLID), "user": GraphQLArgument(user_input_type)}, resolver=resolve_update_user),
        "deleteUser": GraphQLField(GraphQLID, args={"id": GraphQLArgument(GraphQLID)}, resolver=resolve_delete_user),
    },
)

schema = GraphQLSchema(query=query_type, mutation=mutation_type)

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True, executor=AsyncioExecutor()))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
