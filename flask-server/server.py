from gc import collect
import pymongo
from flask import Flask, jsonify, redirect, render_template, session
from flask_cors import CORS, cross_origin
from functools import wraps
import argparse
# from flask_pymongo import PyMongo
# Import user Routes
app = Flask(__name__)
app.secret_key = 'dsafafvgbafvbfvjksviksdvhsdufhu'

# from user import routes
CORS(app)
cors = CORS(app) # CORS - Cross Origin Resource Sharing

app.config['CORS_HEADERS'] = 'Content-Type'

connectionString = "mongodb+srv://asdf:asdf@cluster0.zmqyetm.mongodb.net/test"

client = pymongo.MongoClient(connectionString)
# Creating database for School
# db = client['DigiVerz']
db = client.user_login_system
# Creating a collection
collection = db.login

from user.models import User










# Members API Route
@app.route("/members")
@cross_origin() 
def members():
    thisdict = {
    "brand": "Ford",
    "model": "Mustang",
    "year": 1964
    }
    myAccounts = collection.find({})
    for i in myAccounts:
        print(i["Name"]+" : "+i["Pass"])
    return thisdict


@app.route("/login", methods=['POST'] )
@cross_origin() 
def login():
    # act_input = request.json
    # data = load(json.loads(request.data))
    thisdict = {
    
    "value": True
    }

    myAccounts = collection.find({})
    for i in myAccounts:
        # if(i["Name"]==fname and i["Pass"]==fpass):
        #     return True
        print(i["Name"]+" : "+i["Pass"])
    return thisdict    




# ----------------------------------------------------------------------------------------

#  Decorators
def login_required(f):
    @wraps(f)
    def wrap(*arg, **kwargs):
        if 'logged_in' in session:
            return f(*arg , **kwargs)
        else:
            return redirect('/')    
    return wrap        


#  Routes

@app.route('/')
@cross_origin() 
def home():
    return render_template('home.html')    

@app.route('/dashboard')
@login_required
@cross_origin() 
def dashboard():
    return render_template('dashboard.html')    

@app.route('/user/signup', methods=['POST'])
@cross_origin() 
def dashboarda():
    return User().signup(), 200       

@app.route('/user/signout')
@cross_origin() 
def signout():
    return User().signout()     

@app.route('/user/login', methods=['POST'])
@cross_origin() 
def loginUser():
    return User().login(), 200     





if __name__ == "__main__":
   
    # accounts()
    app.run(debug=True)