from crawlDataFrom_batdongsan_com_vn.functionCrawl import *


urlApartmentOfHanoi = 'https://batdongsan.com.vn/ban-can-ho-chung-cu-ha-noi/p'

apartments = []

i = 1
for link in getAllLinkApartmentsFromBDS_com_vn(endPage=850):
    apartments.append(handlingApartment(link))
    print(i)
    i += 1

writeDataToCSV(apartments)
