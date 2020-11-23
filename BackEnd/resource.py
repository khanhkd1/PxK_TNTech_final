from flask import Flask
from flask_restful import Api

from function.CollectionAPI import ApartmentsCollectionAPI, PredictPriceAPI, DistrictsChart, PredictChart

app = Flask(__name__)
api = Api(app)

api.add_resource(ApartmentsCollectionAPI, '/apartment', methods=['GET'])
api.add_resource(PredictPriceAPI, '/predict', methods=['POST'])
api.add_resource(DistrictsChart, '/districtchart', methods=['GET'])
api.add_resource(PredictChart, '/predictchart', methods=['POST'])


if __name__ == '__main__':
	try:
		app.run(debug=True)
	except Exception as exp:
		print (exp)