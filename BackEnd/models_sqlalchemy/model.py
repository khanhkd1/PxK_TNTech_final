from sqlalchemy.ext.declarative import *
from sqlalchemy.orm import *
from sqlalchemy import *

Base = declarative_base()

# khoi tao ket noi vao co so du lieu
def ConnectToDB():
	# engine = create_engine('mysql+mysqldb://b86499e8070ca1:de0560a9@us-cdbr-east-02.cleardb.com/heroku_80825e0f737d3a6?charset=utf8mb4')
	engine = create_engine('mysql+mysqldb://shop_online:pass@27.118.16.110/shop_online?charset=utf8mb4')
	Session = sessionmaker(bind=engine)
	return Session

class Apartments(Base):
	__tablename__ = 'apartments'
	id = Column(Integer, primary_key=True)
	date = Column(String)
	images = Column(String)
	acreage = Column(Float)
	investor = Column(String)
	pricePerM = Column(Float)
	numBedroom = Column(Float)
	numBathroom = Column(Float)
	furniture = Column(String)
	directionHome = Column(String)
	directionBalcony = Column(String)
	district = Column(String)
	farCenter = Column(Float)
	latitude = Column(Float)
	longitude = Column(Float)
	address = Column(String)


class Apartments_Cop(Base):
	__tablename__ = 'apartments_copy1'
	id = Column(Integer, primary_key=True)
	images = Column(String)
	acreage = Column(Float)
	investor = Column(String)
	pricePerM = Column(Float)
	numBedroom = Column(Integer)
	numBathroom = Column(Integer)
	furniture = Column(String)
	directionHome = Column(String)
	directionBalcony = Column(String)
	district = Column(String)
	farCenter = Column(Float)
	latitude = Column(Float)
	longitude = Column(Float)
	address = Column(String)