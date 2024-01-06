from flask import Flask, jsonify, render_template, request, Response
import json
from json import JSONEncoder
from joblib import load
import pandas as pd

app = Flask(__name__)

recommend = load("C:\\Users\\shris\\Documents\\React Native\\Iot_Enabled_App\\flask-server\\SavedModels\\Crop_recommendation_model.sav")
soil = ['Alluvial', 'Black', 'Clayey', 'Laterite', 'Loamy', 'Red', 'Sandy']
season_list = ['Kharif', 'Rabi']
crops = ['banana', 'coconut', 'tea', 'rubber', 'tapioca', 'coffee', 'cardamom', 'betel', 'bamboo','ladiesfinger','brinjal',
'moringa', 'potato', 'mango', 'cloves', 'chillies', 'cashew', 'arecanut', 'cocoa']
district_data = pd.read_csv("agri_district (1).csv")
blankIndex=[''] * len(district_data)
district_data.index=blankIndex

@app.route('/home', methods = ['GET', 'POST'])
def get_articles():
    if request.method == 'POST':
        data = request.get_json()
        season = int(data['season'])
        district = data['district']
        soil_type = int(data['soil_type'])
        pH = float(data['ph'])
        nitrogen = float(data['nitrogen'])
        potassium = float(data['potassium'])
        phosphorus = float(data['phosphorus'])
        area = float(data['area'])
        #print(data)
        dists = district_data.loc[district_data['Name']==district]
        #print(dists['Rainfall'],dists.iloc[0])
        Rainfall, Humidity, Min_temp, Max_temp = 0, 0, 0, 0
        Rainfall = dists['Rainfall'].iloc[0]
        Humidity = dists['Humidity'].iloc[0]
        Min_temp = dists['Min_Temp'].iloc[0]
        Max_temp = dists['Max_Temp'].iloc[0]
        inputs = [nitrogen, potassium, phosphorus, Humidity, pH, Rainfall, Min_temp, Max_temp]
        print(inputs)
        for i in range(2):
            if(i == season):
                inputs.append(1)
            else:
                inputs.append(0)
        for i in range(0,7):
            if(i == soil_type):
                inputs.append(1)
            else:
                inputs.append(0)
        crop = recommend.predict([inputs])
        print("Result is:", crop)
        crop_temp = crop[0].lower()
        crop_temp = crop_temp[:3]
        for i in crops:
            if(i[:3] == crop_temp):
                yield_predict = load("C:\\Users\\shris\\Documents\\React Native\\Iot_Enabled_App\\flask-server\\SavedModels\\{0}.sav".format(i))
                break

        yield_list = [area, 50, soil_type]
        answer = yield_predict.predict([yield_list])
        print("Total yield: ", answer)
        results = {
            "Crop": crop[0],
            "Yield": round(answer[0],4)
        }
        return json.dumps(results)
    return json.dumps(None)

if __name__ == "__main__":
    app.run(host='192.168.101.114', port=90, debug=True)