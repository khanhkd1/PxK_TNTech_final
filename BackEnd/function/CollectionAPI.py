from flask import request
from flask_restful import Resource
from models_sqlalchemy.model import ConnectToDB, Apartments_Cop
from libraries.libraries import *
from sqlalchemy import and_, func
import pickle
import numpy as np
from libraries.processInputData import *


model1 = {
    'model' : pickle.load(open('./knn_model1.pkl', 'rb')),
    'score' : 0.5487163906853896
}

model2 = {
    'model' : pickle.load(open('./knn_model2.pkl', 'rb')),
    'score' : 0.7499568665347726
}

model3 = {
    'model' : pickle.load(open('./knn_model3.pkl', 'rb')),
    'score' : 0.8057787152867626
}

Session = ConnectToDB()

class DistrictsChart(Resource):
    def get(self):
        try:
            session = Session()
            districts = session.query(Apartments.district, func.sum(Apartments.pricePerM)
                                       , func.count(Apartments.district), func.sum(Apartments.farCenter)).group_by(Apartments.district).all()
            for i in range(len(districts)):
                dic = {}
                dic['district_name'] = districts[i][0]
                dic['pricePerM_mean'] = districts[i][1] / districts[i][2]
                dic['farCenter_mean'] = districts[i][3] / districts[i][2]
                districts[i] = dic
            return districts
        except Exception as exp:
            raise (exp)
            return []
        finally:
            session.close()


class PredictChart(Resource):
    def post(self):
        try:
            session = Session()
            districts = session.query(Apartments.district, func.count(Apartments.district),
                                      func.min(Apartments.pricePerM),
                                      func.max(Apartments.pricePerM)).group_by(Apartments.district).all()
            data = request.get_json()
            for i in range(len(districts)):
                dic = {}
                dic['district'] = districts[i][0].title()
                data['district'] = districts[i][0].title()
                dic['count'] = districts[i][1]
                dic['minPricePerM'] = districts[i][2]
                dic['maxPricePerM'] = districts[i][3]
                dic['pricePerM'] = predictPrice(processInputData(data))['pricePerM']
                districts[i] = dic
            return districts
        except Exception as exp:
            raise (exp)
            return []
        finally:
            session.close()


class ApartmentsCollectionAPI(Resource):
    def get(self):
        try:
            session = Session()
            parameters = request.args
            limit, page, offset, order, colsStr, colsNum = getDefault(
                parameters, Apartments.__table__.columns, Apartments
            )

            apartments = session.query(Apartments)


            apartments = apartments.filter(and_(key.like('%' + colsStr[str(key)] + '%') \
                                               for key in Apartments.__table__.columns \
                                               if str(key) in colsStr.keys()))

            apartments = apartments.filter(and_(key.between(int(colsNum[str(key)]), int(colsNum[str(key)]) + 1) \
                                               for key in Apartments.__table__.columns \
                                               if str(key) in colsNum.keys()))

            apartments = apartments.order_by(order).offset(offset).limit(limit).all()
            for i in range(len(apartments)):
                apartments[i] = standardizedData(apartments[i])
                apartments[i]['address'] = apartments[i]['address'].title()
            return apartments
        except Exception as exp:
            raise (exp)
            return []
        finally:
            session.close()


class PredictPriceAPI(Resource):
    def post(self):
        data = request.get_json()
        data = processInputData(data)
        predict = predictPrice(data)
        return {'pricePerM' : predict['pricePerM'], 'totalPrice' : predict['pricePerM'] * data['acreage'], 'score' : predict['score']}


def predictPrice(data):
    if len(data.keys()) == 6:
        return {'pricePerM': model1['model'].predict(np.array(
            [data['acreage'], data['numBedroom'], data['numBathroom'], data['district'], data['quan'],
             data['huyen']]).reshape(1, -1)).tolist()[0],
                'score': model1['score']}

    elif len(data.keys()) == 7:
        return {'pricePerM': model2['model'].predict(np.array(
            [data['acreage'], data['numBedroom'], data['numBathroom'], data['district'], data['quan'],
             data['huyen'], data['farCenter']]).reshape(1, -1)).tolist()[0],
                'score': model2['score']}

    elif len(data.keys()) == 8:
        return {'pricePerM': model3['model'].predict(np.array(
            [data['investor'], data['acreage'], data['numBedroom'], data['numBathroom'], data['district'], data['quan'],
             data['huyen'], data['farCenter']]).reshape(1, -1)).tolist()[0],
                'score': model3['score']}