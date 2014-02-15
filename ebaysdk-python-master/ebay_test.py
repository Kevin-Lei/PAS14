from ebaysdk.finding import Connection
try:
    api = Connection(appid='KevinLei-a910-4e29-acdd-98d66ae8275e')
    api.execute('findItemsAdvanced', {'keywords': 'shoes'})

    print api.response_dict()
except ConnectionError as e:
    raise e