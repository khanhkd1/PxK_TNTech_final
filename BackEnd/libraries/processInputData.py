label_district = {
    'Ba Đình': 0,
    'Bắc Từ Liêm': 1,
    'Chương Mỹ': 2,
    'Cầu Giấy': 3,
    'Gia Lâm': 4,
    'Hai Bà Trưng': 5,
    'Hoài Đức': 6,
    'Hoàn Kiếm': 7,
    'Hoàng Mai': 8,
    'Hà Đông': 9,
    'Long Biên': 10,
    'Nam Từ Liêm': 11,
    'Thanh Oai': 12,
    'Thanh Trì': 13,
    'Thanh Xuân': 14,
    'Thạch Thất': 15,
    'Tây Hồ': 16,
    'Đan Phượng': 17,
    'Đông Anh': 18,
    'Đống Đa': 19
}

label_investor = {
    'công ty cp sông đà 7': 0,
    'công ty cp tập đoàn nam cường hà nội': 1,
    'công ty cp tập đoàn sunshine': 2,
    'công ty cp xuất nhập khẩu tổng hợp hà nội - geleximco': 3,
    'công ty cp xây dựng số 2 - vinaconex2': 4,
    'công ty cp xây dựng và thương mại bắc hà': 5,
    'công ty cp đầu tư văn phú - invest': 6,
    'công ty cp đầu tư xây dựng số 9 hà nội': 7,
    'công ty cổ phần tập đoàn flc': 8,
    'công ty tnhh bất động sản và xây dựng việt hưng': 9,
    'công ty tnhh phát triển khu đô thị nam thăng long': 10,
    'công ty tnhh thương mại - quảng cáo - xây dựng - địa ốc việt hân': 11,
    'doanh nghiệp tư nhân xây dựng số 1 tỉnh điện biên': 12,
    'other': 13,
    'tân hoàng minh group': 14,
    'tập đoàn sun group': 15,
    'tập đoàn vingroup': 16,
    'tổng công ty đầu tư phát triển hạ tầng đô thị - udic': 17,
    'tổng công ty đầu tư phát triển nhà và đô thị bộ quốc phòng': 18,
    'tổng công ty đầu tư phát triển nhà và đô thị hud': 19,
    'tổng công ty đầu tư và phát triển nhà hà nội - handico': 20
}

label_quan = [
    'Hoàn Kiếm',
    'Đống Đa',
    'Ba Đình',
    'Hai Bà Trưng',
    'Hoàng Mai',
    'Thanh Xuân',
    'Long Biên',
    'Nam Từ Liêm',
    'Bắc Từ Liêm',
    'Tây Hồ',
    'Cầu Giấy',
    'Hà Đông'
]


def processInputData(data):
    if 'district' in data:
        if data['district'] in label_quan:
            data['quan'] = 1
            data['huyen'] = 0
        else:
            data['quan'] = 0
            data['huyen'] = 1
        data['district'] = label_district[data['district']]

    if 'investor' in data:
        try:
            data['investor'] = label_investor[data['investor']]
        except: pass

    return data

