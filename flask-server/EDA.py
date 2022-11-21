from msilib.schema import File
from digiverz_portal_API.FlaskRestAPI import test_db
import json
from bson import json_util
import collections
from http import client
from inspect import _void
import pprint
from tokenize import Name
from dotenv import load_dotenv, find_dotenv
import os
import sys
import bson
import pickle
import pprint
import pandas_profiling as pp
import seaborn as sns
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from pymongo import MongoClient
load_dotenv(find_dotenv())
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


def eda_endpoint(endpoints):
    @endpoints.route("/file", methods=['POST'])
    def add_file():
        
        collection = test_db.dqresults
        f = request.files['file']
        

        pandas_df = pd.read_csv(f, low_memory=False, encoding= 'unicode_escape')
        pandas_df.to_pickle("./dummy.pkl")
        pdf= pandas_df.fillna(0)
        
        # sdf = spark.createDataFrame(pandas_df.astype(str))

        # # sdf.printSchema()
        # sdf.show()
        # print(sdf.head())
        # svm = sns.heatmap(pandas_df.isnull(),cbar=False,cmap='viridis')
        

        # figure = svm.get_figure()    
        # figure.savefig('svm_conf.png',dpi=400)
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


        



        inserted_id = collection.insert_one({'ColunmList': list(pandas_df.columns), 'dataset_shape':dataset_shape, 'df_head':pdf.head().values.tolist(),'df_tail':pdf.tail().values.tolist(),
         'size': res_size, 'null_values':pandas_df.isnull().sum().values.tolist(),'unique_values':pandas_df.nunique().values.tolist(),
        'df_datatypes':dtype,'df_duplicate_value':str(df_duplicate), 'df_des':res_des,'file_name':f.filename,'current_time':current_time    }).inserted_id
        print(inserted_id)
        resp = jsonify("user added succesfully")
        resp.status_code = 200

        return resp
       
    return endpoints 
