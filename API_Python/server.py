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
    GraphQLNonNull,
)
from graphql.execution.executors.asyncio import AsyncioExecutor
import mysql.connector

app = Flask(__name__)
CORS(app, origins=["http://app_form:3000", "http://app_admin:3001"], supports_credentials=True)

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

admin_type = GraphQLObjectType(
    name="Admin",
    fields={
        "_id": GraphQLField(GraphQLID),
        "username": GraphQLField(GraphQLString),
        "password": GraphQLField(GraphQLString),
        "role": GraphQLField(GraphQLString),
    },
)

def resolve_get_user(_, info, _id):
    # Ouvrir une connexion
    db = mysql.connector.connect(
      host="db_mysql",
      user="root",
      password="root",
      database="user_form"
    )
    cursor = db.cursor()

    try:
        # Exécuter la requête
        cursor.execute("SELECT * FROM users WHERE _id = %s", (_id,))
        result = cursor.fetchone()

        # Fermer le curseur et la connexion
        cursor.close()
        db.close()

        return result
    except Exception as e:
        # Fermer le curseur et la connexion
        cursor.close()
        db.close()

        # Renvoi de l'erreur
        return {"error": str(e)}

def resolve_get_all_users(_, info):
    # Ouvrir une connexion
    db = mysql.connector.connect(
      host="db_mysql",
      user="root",
      password="root",
      database="user_form"
    )
    cursor = db.cursor()

    try:
        # Exécuter la requête
        cursor.execute("SELECT * FROM users")
        result = [{"_id": row[0], "firstname": row[1], "lastname": row[2], "email": row[3], "birthdate": row[4], "city": row[5], "zipcode": row[6]} for row in cursor.fetchall()]
        
        cursor.close()
        db.close()
        
        return result
    except Exception as e:
        # Fermer le curseur et la connexion
        cursor.close()
        db.close()

        # Renvoi de l'erreur
        return {"error": str(e)}

def resolve_get_admin(_, info, _id):
    # Ouvrir une connexion
    db = mysql.connector.connect(
      host="db_mysql",
      user="root",
      password="root",
      database="user_form"
    )
    cursor = db.cursor()

    try:
        # Exécuter la requête
        cursor.execute("SELECT * FROM admins WHERE _id = %s", (_id,))
        result = cursor.fetchone()

        # Fermer le curseur et la connexion
        cursor.close()
        db.close()

        return result
    except Exception as e:
        # Fermer le curseur et la connexion
        cursor.close()
        db.close()

        # Renvoi de l'erreur
        return {"error": str(e)}

def resolve_get_all_admins(_, info):
    # Ouvrir une connexion
    db = mysql.connector.connect(
      host="db_mysql",
      user="root",
      password="root",
      database="user_form"
    )
    cursor = db.cursor()

    try:
        # Exécuter la requête
        cursor.execute("SELECT * FROM admins")
        result = [{"_id": row[0], "username": row[1], "password": row[2], "role": row[3]} for row in cursor.fetchall()]
        
        cursor.close()
        db.close()
        
        return result
    except Exception as e:
        # Fermer le curseur et la connexion
        cursor.close()
        db.close()

        # Renvoi de l'erreur
        return {"error": str(e)}

def resolve_add_user(_, info, user):
    # Ouvrir une connexion
    db = mysql.connector.connect(
      host="db_mysql",
      user="root",
      password="root",
      database="user_form"
    )
    cursor = db.cursor()

    try:
        # Valider les entrées
        if not all(key in user for key in ["firstname", "lastname", "email", "birthdate", "city", "zipcode"]):
            raise Exception("Toutes les données ne sont pas présentes")

        # Exécuter la requête
        cursor.execute("INSERT INTO users (firstname, lastname, email, birthdate, city, zipcode) VALUES (%s, %s, %s, %s, %s, %s)", (user["firstname"], user["lastname"], user["email"], user["birthdate"], user["city"], user["zipcode"]))
        db.commit()

        # Récupérer le résultat
        cursor.execute("SELECT * FROM users WHERE _id = %s", (cursor.lastrowid,))
        result = cursor.fetchone()

        # Fermer le curseur et la connexion
        cursor.close()
        db.close()

        return result
    except Exception as e:
        # Fermer le curseur et la connexion
        cursor.close()
        db.close()

        # Renvoi de l'erreur
        return {"error": str(e)}


def resolve_update_user(_, info, id, user):
    # Ouvrir une connexion
    db = mysql.connector.connect(
      host="db_mysql",
      user="root",
      password="root",
      database="user_form"
    )
    cursor = db.cursor()

    try:
        # Valider les entrées
        if not all(key in user for key in ["firstname", "lastname", "email", "birthdate", "city", "zipcode"]):
            raise Exception("Toutes les données ne sont pas présentes")

        # Exécuter la requête
        cursor.execute("UPDATE users SET firstname = %s, lastname = %s, email = %s, birthdate = %s, city = %s, zipcode = %s WHERE _id = %s", (user["firstname"], user["lastname"], user["email"], user["birthdate"], user["city"], user["zipcode"], id))
        db.commit()

        # Fermer le curseur et la connexion
        cursor.close()
        db.close()

        return id
    except Exception as e:
        # Fermer le curseur et la connexion
        cursor.close()
        db.close()

        # Renvoi de l'erreur
        return {"error": str(e)}

def resolve_delete_user(_, info, _id):
    # Ouvrir une connexion
    db = mysql.connector.connect(
      host="db_mysql",
      user="root",
      password="root",
      database="user_form"
    )
    cursor = db.cursor()

    try:
        # Exécuter la requête
        cursor.execute("DELETE FROM users WHERE _id = %s", (_id,))
        db.commit()

        # Fermer le curseur et la connexion
        cursor.close()
        db.close()

        return _id
    except Exception as e:
        # Fermer le curseur et la connexion
        cursor.close()
        db.close()

        # Renvoi de l'erreur
        return {"error": str(e)}

query_type = GraphQLObjectType(
    name="Query",
    fields={
        "getUser": GraphQLField(user_type, args={"_id": GraphQLArgument(GraphQLID)}, resolver=resolve_get_user),
        "getAllUsers": GraphQLField(GraphQLList(user_type), resolver=resolve_get_all_users),
        "getAdmin": GraphQLField(admin_type, args={"_id": GraphQLArgument(GraphQLID)}, resolver=resolve_get_admin),
        "getAllAdmins": GraphQLField(GraphQLList(admin_type), resolver=resolve_get_all_admins),
    },
)

mutation_type = GraphQLObjectType(
    name="Mutation",
    fields={
        "addUser": GraphQLField(user_type, args={"user": GraphQLArgument(user_input_type)}, resolver=resolve_add_user),
        "updateUser": GraphQLField(GraphQLID, args={"_id": GraphQLArgument(GraphQLID), "user": GraphQLArgument(user_input_type)}, resolver=resolve_update_user),
        "deleteUser": GraphQLField(GraphQLID, args={"_id": GraphQLArgument(GraphQLID)}, resolver=resolve_delete_user),
    },
)

schema = GraphQLSchema(query=query_type, mutation=mutation_type)

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True, executor=AsyncioExecutor()))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
