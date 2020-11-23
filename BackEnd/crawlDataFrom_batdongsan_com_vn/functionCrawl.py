from crawlDataFrom_batdongsan_com_vn.Apartment import Apartment
from crawlDataFrom_batdongsan_com_vn.miniFunction import addAttributesToObject
from bs4 import BeautifulSoup
import urllib.request
import csv


def getListLinkApartmentOrProjectLandFromURL(url):
    '''
    :param url: url of the page
    :return: list url of apartments from the page
    '''
    page = urllib.request.urlopen(url)
    soup = BeautifulSoup(page, 'html.parser')
    apartments = soup.find_all('div', class_="vip0 product-item clearfix") + \
                 soup.find_all('div', class_="vip0 vipaddon product-item clearfix") + \
                 soup.find_all('div', class_="vip1 vipaddon product-item clearfix") + \
                 soup.find_all('div', class_="vip1 product-item clearfix") + \
                 soup.find_all('div', class_="vip2 product-item clearfix") + \
                 soup.find_all('div', class_="vip2 vipaddon product-item clearfix") + \
                 soup.find_all('div', class_="vip3 vipaddon product-item clearfix") + \
                 soup.find_all('div', class_="vip3 product-item clearfix") + \
                 soup.find_all('div', class_="vip4 product-item clearfix") + \
                 soup.find_all('div', class_="vip4 vipaddon product-item clearfix") + \
                 soup.find_all('div', class_="vip5 vipaddon product-item clearfix") + \
                 soup.find_all('div', class_="vip5 product-item clearfix")
    for i in range(len(apartments)):
        apartments[i] = 'https://batdongsan.com.vn' + apartments[i].find(class_="product-main").find('a').get('href')
    return apartments


def getAllLinkApartmentsFromBDS_com_vn(urlApartmentOfHanoi='https://batdongsan.com.vn/ban-can-ho-chung-cu-ha-noi/p',
                                       endPage=750):
    '''
    :param endPage:
    :param urlApartmentOfHanoi: default = "https://batdongsan.com.vn/ban-can-ho-chung-cu-ha-noi/p"
    :return: list all links of apartments
    '''

    listLinkApartments = []
    startPage = 1
    while startPage <= endPage:
        try:
            print(startPage)
            listLinkApartments += getListLinkApartmentOrProjectLandFromURL(urlApartmentOfHanoi
                                                                           + str(startPage))
            startPage += 1
        except:
            continue
    return listLinkApartments



def handlingApartment(ApartmentUrl):
    '''
    :param ApartmentUrl: url of an apartment
    :return: object Apartment
    '''

    page = urllib.request.urlopen(ApartmentUrl)
    soup = BeautifulSoup(page, 'html.parser')
    apartment = Apartment()
    apartment.linkApartment = ApartmentUrl
    apartment = addAttributesToObject(soup, apartment)
    return apartment


def writeDataToCSV(apartmentList):
    with open('data_crawl_from_web/rawData.csv', 'w', newline='', encoding='utf-8') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(['tileProduct', 'date', 'images', 'acreage', 'contact', 'location', 'investor', 'juridical',
                         'price', 'numBedroom', 'directionHome', 'directionBalcony', 'service', 'furniture',
                         'numBathroom',
                         'description', 'facade', 'wayIn', 'nameProject', 'keyWords', 'address', 'sizeProject',
                         'farCenter', 'linkProject', 'linkApartment'])
        for apartment in apartmentList:
            writer.writerow(
                [apartment.tileProduct, apartment.date, apartment.images, apartment.acreage, apartment.contact,
                 apartment.location, apartment.investor, apartment.juridical, apartment.price, apartment.numBedroom,
                 apartment.directionHome, apartment.directionBalcony, apartment.service, apartment.furniture,
                 apartment.numBathroom, apartment.description, apartment.facade, apartment.wayIn, apartment.nameProject,
                 apartment.keyWords, apartment.address, apartment.sizeProject, apartment.farCenter,
                 apartment.linkProject, apartment.linkApartment])
