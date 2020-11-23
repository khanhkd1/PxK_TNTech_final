import pandas as pd
import numpy as np

df = pd.read_csv('dataPxK_full.csv')

def dataProcess(df):
    df = df.drop(['price'], axis=1)
    df = df.replace('Missing', np.nan)

    # drop nhiễu (căn có 20 tolet, 19 phòng ngủ)
    df = df.drop(df[df.numBathroom == 20].index)

    # xử lý furniture
    df.loc[(df['pricePerM'] >= 35) & (df['quan'] == 1) & (df['furniture'].isna()), 'furniture'] = 'cao cấp'
    df.loc[(df['pricePerM'] < 35) & (df['pricePerM'] >= 30) & (df['furniture'].isna()), 'furniture'] = 'full'

    # xử lý direction home
    df.loc[(df['directionHome'].isna()) & (df['pricePerM'] >= 40), 'directionHome'] = 'nam'
    df.loc[(df['directionHome'].isna()) & (df['pricePerM'] < 40) & (df['pricePerM'] >= 35), 'directionHome'] = 'bắc'
    df.loc[(df['directionHome'].isna()) & (df['pricePerM'] < 35) & (df['pricePerM'] >= 30), 'directionHome'] = 'tây'
    df.loc[(df['directionHome'].isna()) & (df['pricePerM'] < 30) & (df['pricePerM'] >= 27.5), 'directionHome'] = 'tây-bắc'
    df.loc[(df['directionHome'].isna()) & (df['pricePerM'] < 27.5) & (df['pricePerM'] >= 25), 'directionHome'] = 'tây-nam'
    df.loc[(df['directionHome'].isna()) & (df['pricePerM'] < 25) & (df['pricePerM'] >= 22.5), 'directionHome'] = 'đông-nam'
    df.loc[(df['directionHome'].isna()) & (df['pricePerM'] < 22.5) & (df['pricePerM'] >= 20), 'directionHome'] = 'đông'
    df.loc[(df['directionHome'].isna()) & (df['pricePerM'] < 20), 'directionHome'] = 'đông-bắc'

    # xử lý direction balcony
    df.loc[(df['directionBalcony'].isna()) & (df['pricePerM'] >= 40), 'directionBalcony'] = 'đông'
    df.loc[(df['directionBalcony'].isna()) & (df['pricePerM'] < 40) & (df['pricePerM'] >= 35), 'directionBalcony'] = 'nam'
    df.loc[(df['directionBalcony'].isna()) & (df['pricePerM'] < 35) & (df['pricePerM'] >= 30), 'directionBalcony'] = 'bắc'
    df.loc[(df['directionBalcony'].isna()) & (df['pricePerM'] < 30) & (df['pricePerM'] >= 27.5), 'directionBalcony'] = 'đông-bắc'
    df.loc[(df['directionBalcony'].isna()) & (df['pricePerM'] < 27.5) & (df['pricePerM'] >= 25), 'directionBalcony'] = 'đông-nam'
    df.loc[(df['directionBalcony'].isna()) & (df['pricePerM'] < 25) & (df['pricePerM'] >= 22.5), 'directionBalcony'] = 'tây-bắc'
    df.loc[(df['directionBalcony'].isna()) & (df['pricePerM'] < 22.5) & (df['pricePerM'] >= 20), 'directionBalcony'] = 'tây-nam'
    df.loc[(df['directionBalcony'].isna()) & (df['pricePerM'] < 20), 'directionBalcony'] = 'tây'

    df.loc[(df['investor'] != 'tập đoàn vingroup') & (df['investor'] != 'tân hoàng minh group') & \
        (df['investor'] != 'doanh nghiệp tư nhân xây dựng số 1 tỉnh điện biên') & (df['investor'] != 'công ty tnhh thương mại - quảng cáo - xây dựng - địa ốc việt hân') & \
        (df['investor'] != 'công ty cp tập đoàn sunshine') & (df['investor'] != 'công ty cp xuất nhập khẩu tổng hợp hà nội - geleximco') & \
        (df['investor'] != 'công ty cp tập đoàn nam cường hà nội') & (df['investor'] != 'tổng công ty đầu tư phát triển nhà và đô thị bộ quốc phòng') & \
        (df['investor'] != 'tổng công ty đầu tư phát triển nhà và đô thị hud') & (df['investor'] != 'tổng công ty đầu tư và phát triển nhà hà nội - handico') & \
        (df['investor'] != 'tổng công ty đầu tư phát triển hạ tầng đô thị - udic') & (df['investor'] != 'tập đoàn sun group') & \
        (df['investor'] != 'công ty cp sông đà 7') & (df['investor'] != 'công ty cp xây dựng số 2 - vinaconex2') & \
        (df['investor'] != 'công ty cp đầu tư xây dựng số 9 hà nội') & (df['investor'] != 'công ty tnhh bất động sản và xây dựng việt hưng') & \
        (df['investor'] != 'công ty cổ phần tập đoàn flc') & (df['investor'] != 'công ty cp xây dựng và thương mại bắc hà') & \
        (df['investor'] != 'công ty tnhh phát triển khu đô thị nam thăng long') & (df['investor'] != 'công ty cp đầu tư văn phú - invest'), 'investor'] = 'other'

    df['numBedroom'] = df['numBedroom'].astype(int)
    df['numBathroom'] = df['numBathroom'].astype(int)

    return df


df = dataProcess(df)


df.to_csv('sau_xu_ly.csv', index=False)




