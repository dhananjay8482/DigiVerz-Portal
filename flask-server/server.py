# from crypt import methods
import os
from fileinput import filename
from gc import collect
import numpy as np
import pandas as pd
import pymongo
from flask import Flask, jsonify, redirect, render_template, session, request, url_for, flash
from flask_cors import CORS, cross_origin
from functools import wraps
import argparse
import json
from bson import json_util
from datetime import datetime
# EDA .py imports STARTS
import json
from bson import json_util
import collections
from http import client
from inspect import _void
import pprint
from tokenize import Name
import os
import sys
import bson
import pickle
import pprint
import seaborn as sns
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from pymongo import MongoClient
from flask import Flask
import datetime
import json
import numpy as np
from flask_pymongo import PyMongo
from bson import json_util
from flask_cors import CORS
from flask import jsonify, request
from bson.objectid import ObjectId
from werkzeug.utils import secure_filename  
import pandas as pd
from datetime import datetime
# EDA .py imports ENDS
# from flask_pymongo import PyMongo
# Import user Routes
app = Flask(__name__)
app.secret_key = 'dsafafvgbafvbfvjksviksdvhsdufhu'
from werkzeug.utils import secure_filename

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

# ----------------------------------------------------------------------------------------

#  Decorators ----------------------------------------------------------------------------
def login_required(f):
    @wraps(f)
    def wrap(*arg, **kwargs):
        if 'logged_in' in session:
            return f(*arg , **kwargs)
        else:
            return redirect('/')    
    return wrap        


#  Routes  ----------------------------------------------------------------------------

@app.route('/')
@cross_origin() 
def home():
    return render_template('home.html')    

@app.route('/dashboard')
@login_required
@cross_origin() 
def dashboard():
    return render_template('dashboard.html')    

#  Routes For Login ---------------------------------------------------------------------    

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

#  Routes For Model Builder ------------------------------------------------------------- 

data = pd.read_csv('./static/Cleaned_data.csv')
import pickle

pipe = pickle.load(open("./static/RidgeModel.pkl",'rb'))

@app.route('/modelbuilder')
@cross_origin() 
def modelBuilder():
    loactions = sorted(data['location'].unique())
    # print(loactions)
    return render_template('index.html', locations = loactions )  

@app.route('/modelbuilder/predict', methods=['POST'])
@cross_origin() 
def predict():


    location = request.form.get('location')
    bhk = request.form.get('bhk')
    bhk = float(bhk)
    bath = request.form.get('bath')
    bath = float(bath)
    sqft = request.form.get('total_sqft')
    
    print(location, bhk, bath, sqft)
    # input = pd.DataFrame([[location,sqft,bath,bhk]],columns=['location','total_sqft','bath','bhk'])
    input = pd.DataFrame([[location,sqft,bath,bhk]],columns=['location','total_sqft','bath','bhk'])
    prediction = pipe.predict(input)[0] * 100000

    ans = str(np.round(prediction,2))

    answer = {
        "ans":ans,
        "name":"name"
    }

# To Add into the Database
    temp1 = {
        "location":location,
        "bhk":bhk,
        "bath":bath,
        "sqft":sqft,
        "answer":ans
    }
    connectionString = "mongodb+srv://asdf:asdf@cluster0.zmqyetm.mongodb.net/test"
    client = pymongo.MongoClient(connectionString)
    db = client.DigiVerz
    db.ModelBuilderHistory.insert_one(temp1)
    return answer


@app.route('/modelbuilder/history')
@cross_origin()
def predictHistory():
    connectionString = "mongodb+srv://asdf:asdf@cluster0.zmqyetm.mongodb.net/test"
    client = pymongo.MongoClient(connectionString)
    db = client.DigiVerz.ModelBuilderHistory
    x = db.find()
    ans=1
    for data in x:
        # ans = data
        print(data)
    # a = json.stringify(x) 
    answer = {
        "ans":x,
        "name":"name"
    }
    return x

# Hello world
# ----------------------- 1. Data Analyst -----------------------------------
UPLOAD_FOLDER = '/inputCSV'
ALLOWED_EXTENSIONS = set(['csv'])
def allowed_file(filename): 
    return '.' in filename and \
        filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/uploadCSV', methods=['GET','POST'])
def uploadCSV():
    if request.method=='POST':
        file = request.files['file']
        print('inside if')
        if file and allowed_file(file.filename):
            print('inside if if')
            filename = secure_filename(file.filename)
            filename = filename.split('.')[0]
            new_filename = f'{filename}_{str(datetime.now())}.csv'
            file.save(os.path.join('inputCSV', new_filename))
            # return redirect(url_for('uploaded_file',
            #                         new_filename=filename))
        return 'uploaded'
    return render_template('uploadCSV.html')


# ------------------------------ code EDA (Data quality) Start ------------------------------- 
@app.route("/file", methods=['POST'])
def add_file():
    db = client.DigiVerz.EDAResults
    f = request.files['file']



    pandas_df = pd.read_csv(f, low_memory=False, encoding= 'unicode_escape')
    pandas_df.to_pickle("./dummy.pkl")
    pdf= pandas_df.fillna(0)
    
   
    now = datetime.now()
    current_time = now.strftime("%m/%d/%Y,%H:%M:%S")
    #*size and shape of df
    size = sys.getsizeof(pandas_df)
    res_size = size/1000000
    dataset_shape = pandas_df.shape
    
    #*df_datatypes
    dtype = pandas_df.dtypes.values.tolist()
    for i in range(len(dtype)):
        dtype[i] = str(dtype[i])

    df_duplicate =pandas_df.duplicated().sum()    

    res_des = pandas_df.describe().fillna(0).values.tolist()
    
    inserted_id = db.insert_one({'ColunmList': list(pandas_df.columns), 
    'dataset_shape':dataset_shape, 
    'df_head':pdf.head().values.tolist(),
    'df_tail':pdf.tail().values.tolist(),
    'size': res_size, 
    'null_values':pandas_df.isnull().sum().values.tolist(),
    'unique_values':pandas_df.nunique().values.tolist(),
    'df_datatypes':dtype,
    'df_duplicate_value':str(df_duplicate), 
    'df_des':res_des,'file_name':f.filename,
    'current_time':current_time    }).inserted_id
    print(inserted_id)
    resp = jsonify("user added succesfully")
    resp.status_code = 200

    return resp


@app.route("/dqgraph_1", methods=['POST'])
def DQ_graph():
    _req = request.get_json()
    
    df = pd.read_pickle("./dummy.pkl")
    
    graph_1 = _req['graph_1']
    
    print(graph_1)
    plt.hist(df[graph_1])
    plt.savefig(r"C:\Users\Danny\Desktop\DigiTech Portal\client\src\assets\graph1.png")
    plt.clf()


    
    resp = jsonify("histogram graph is added")
    resp.status_code = 200


    return resp


@app.route("/dqgraph_2", methods=['POST'])
def DQ_graph_2():
    _req = request.get_json()
    df = pd.read_pickle("./dummy.pkl")
    
    graph_2 = _req['graph_2']
    plt.scatter(df.index,df[graph_2])
    plt.savefig(r"C:\Users\Danny\Desktop\DigiTech Portal\client\src\assets\graph2.png")
    plt.clf()

    df = pd.read_pickle("./dummy.pkl")
    
    
    resp = jsonify("scaterplt graph is added")
    resp.status_code = 200


    return resp


@app.route("/dqgraph_3", methods=['POST'])
def DQ_graph_3():
    _req = request.get_json()
    df = pd.read_pickle("./dummy.pkl")
    
    graph_3 = _req['graph_3']
    sns.set(rc={'figure.figsize':(5,5)})
    sns.kdeplot(df[graph_3],shade = True)
    plt.savefig(r"C:\Users\Danny\Desktop\DigiTech Portal\client\src\assets\graph3.png")
    plt.clf()

    df = pd.read_pickle("./dummy.pkl")
    
    
    resp = jsonify("scaterplt graph is added")
    resp.status_code = 200


    return resp   

@app.route("/dqgraph_4", methods=['POST'])
def DQ_graph_4():
    _req = request.get_json()
    df = pd.read_pickle("./dummy.pkl")
    
    graph_4 = _req['graph_4']
    graph_4_1 = _req['graph_4_1']
    sns.boxplot(x=graph_4,y=graph_4_1,data=df,palette='rainbow')
    plt.savefig(r"C:\Users\Danny\Desktop\DigiTech Portal\client\src\assets\graph4.png")
    plt.clf()

    df = pd.read_pickle("./dummy.pkl")
    
    
    resp = jsonify("scaterplt graph is added")
    resp.status_code = 200


    return resp

@app.route("/dqgraph_5", methods=['POST'])
def DQ_graph_5():
    _req = request.get_json()
    df = pd.read_pickle("./dummy.pkl")
    
    graph_5 = _req['graph_5']
    graph_5_1 = _req['graph_5_1']
    sns.stripplot(x=graph_5,y=graph_5_1,data=df,palette='rainbow')
    plt.savefig(r"C:\Users\Danny\Desktop\DigiTech Portal\client\src\assets\graph5.png")
    plt.clf()

    df = pd.read_pickle("./dummy.pkl")
    
    
    resp = jsonify("scaterplt graph is added")
    resp.status_code = 200


    return resp 

@app.route("/dqgraph_6", methods=['POST'])
def DQ_graph_6():
    _req = request.get_json()
    df = pd.read_pickle("./dummy.pkl")
    
    graph_6 = _req['graph_6']
    graph_6_1 = _req['graph_6_1']
    sns.violinplot(x=graph_6,y=graph_6_1,data=df,palette='rainbow')
    
    plt.savefig(r"C:\Users\Danny\Desktop\DigiTech Portal\client\src\assets\graph6.png")
    plt.clf()

    df = pd.read_pickle("./dummy.pkl")
    
    
    resp = jsonify("scaterplt graph is added")
    resp.status_code = 200


    return resp

@app.route("/dqgraph_7", methods=['POST'])
def DQ_graph_7():
       _req = request.get_json()
       df = pd.read_pickle("./dummy.pkl")
       
       graph_7 = _req['graph_7']
       graph_7_1 = _req['graph_7_1']
       sns.swarmplot(x=graph_7,y=graph_7_1,data=df,palette='rainbow')
       
       plt.savefig(r"C:\Users\Danny\Desktop\DigiTech Portal\client\src\assets\graph7.png")
       plt.clf()

       df = pd.read_pickle("./dummy.pkl")
       
       
       resp = jsonify("scaterplt graph is added")
       resp.status_code = 200


       return resp    

@app.route("/dqgraph_8", methods=['POST'])
def DQ_graph_8():
    _req = request.get_json()
    df = pd.read_pickle("./dummy.pkl")
    
    graph_8 = _req['graph_8']
    
    sns.countplot(x=graph_8,data=df)
    
    plt.savefig(r"C:\Users\Danny\Desktop\DigiTech Portal\client\src\assets\graph8.png")
    plt.clf()

    df = pd.read_pickle("./dummy.pkl")
    
    
    resp = jsonify("scaterplt graph is added")
    resp.status_code = 200


    return resp

@app.route("/dqhistory", methods=['GET'])
def dq_result_history_eda():
    resp = {}
    connectionString = "mongodb+srv://asdf:asdf@cluster0.zmqyetm.mongodb.net/test"
    client = pymongo.MongoClient(connectionString)
    db = client.DigiVerz.EDAResults
    users = db.find()
    users = list(users) 
    output = [{'ColunmList' : user['ColunmList'], 'dataset_shape' : user['dataset_shape']
    ,'df_head' : user['df_head'], 'df_tail' : user['df_tail'],
    'unique_values':user['unique_values'],
    'size' : user['size'], 'null_values' : user['null_values'],
    'df_datatypes' : user['df_datatypes'], 'df_duplicate_value' : user['df_duplicate_value'],
    'df_des' : user['df_des'], 'file_name' : user['file_name'],
    'current_time' : user['current_time'],
    } for user in users]   #list comprehension

    resp['data'] = output
    
    return resp


# ------------------------------ code EDA End ------------------------------- 



if __name__ == "__main__":
   
    # accounts()
    app.run(debug=True)