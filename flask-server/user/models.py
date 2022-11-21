from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
import pymongo
# from server import db
import uuid

class User:

    def start_session(self, user):
        del user['password']
        session['logged_in'] = True
        session['user'] = user
        return jsonify(user)

    def signup(self):

        # Create the user object
        user = {
            "_id":uuid.uuid4().hex,
            "name":request.form.get('name'),
            "email":request.form.get('email'),
            "password":request.form.get('password')
        }

        # Encryption of password
        user['password'] = pbkdf2_sha256.encrypt(user['password'])

        connectionString = "mongodb+srv://asdf:asdf@cluster0.zmqyetm.mongodb.net/test"

        client = pymongo.MongoClient(connectionString)
        # Creating database for School
        # db = client['DigiVerz']
        db = client.DigiVerz

        # Check for existing Email
        if db.users.find_one({"email": user['email']}):
            return jsonify({"error":"Email aleready used"})
        

        if db.users.insert_one(user):
            return self.start_session(user)

        return jsonify(user)

    def signout(self):
        session.clear()
        return redirect('/')

    def login(self):
        connectionString = "mongodb+srv://asdf:asdf@cluster0.zmqyetm.mongodb.net/test"

        client = pymongo.MongoClient(connectionString)
        # Creating database for School
        # db = client['DigiVerz']
        db = client.DigiVerz
        user = db.users.find_one({
            "email":request.form.get('email')
        })

        if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']) :
            return self.start_session(user)

        return jsonify({"error":"Invalied login credientials"})


    # Model Builder History Purpose
    def signup(self):

        # Create the user object
        user = {
            "_id":uuid.uuid4().hex,
            "name":request.form.get('name'),
            "email":request.form.get('email'),
            "password":request.form.get('password')
        }

        # Encryption of password
        user['password'] = pbkdf2_sha256.encrypt(user['password'])

        connectionString = "mongodb+srv://asdf:asdf@cluster0.zmqyetm.mongodb.net/test"

        client = pymongo.MongoClient(connectionString)
        # Creating database for School
        # db = client['DigiVerz']
        db = client.DigiVerz

        # Check for existing Email
        if db.users.find_one({"email": user['email']}):
            return jsonify({"error":"Email aleready used"})
        

        if db.users.insert_one(user):
            return self.start_session(user)

        return jsonify(user)


