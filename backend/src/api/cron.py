import os
import logging
import requests
import json
import re
from api.models import dataScraper, newsletter
from fuzzywuzzy import fuzz

# N8N : Main workflow

# Url for testing : http://localhost:5678/webhook-test/a17ec0a5-0146-4921-8402-295107ef5273

# Url for Production : http://localhost:5678/webhook/a17ec0a5-0146-4921-8402-295107ef5273


# N8N : Workflow testing

# Url test : http://localhost:5678/webhook-test/f3cb23cf-aa52-4f7a-8cf0-3ea2efea7871

# Url Production : http://localhost:5678/webhook/f3cb23cf-aa52-4f7a-8cf0-3ea2efea7871



# path log

dir_path = os.path.dirname(os.path.realpath(__file__))
filename = os.path.join(dir_path, 'scraping_from_n8n.log')

#logging
logging.basicConfig(level=logging.DEBUG,
                    filename = filename,
                    filemode="a",
                    format='%(asctime)s - %(levelname)s - %(message)s')


# function send request and receive data
# Return liste des dict
def datafromscraping():
    try:
        resp = requests.get("http://localhost:5678/webhook-test/f3cb23cf-aa52-4f7a-8cf0-3ea2efea7871")
        result = json.loads(resp.content)
    except:
        logging.error("Request from webhooks error")
        return False

    return result

# function for manipulate data
# return liste des dict clean
def processing():
    data1 = datafromscraping()
    data2 = []
    # Regex
    remtag = re.compile('<.*?>')

    if data1 == False:
        logging.error("Data not clean")
        return False
    else:
        try:
            for item in data1:
                #for item in data1:
                # clean content data1
                t1 = item['content']

                # remove all tag html
                t2 = re.sub(remtag, ' ', t1)

                # remove \n and \t in string
                t3 = t1.replace("\n", " ").replace("\t", " ")
                t4 = " ".join(t2.split())

                item['content'] = t4

                # add item clean in data2
                data2.append(item)
            logging.info("{} data was extract".format(len(data1)))
        except:
            logging.error("Data not found and not clean")
            return False

        return data2


# Trie before insert
# return liste des dict unique and not exist in database
def filterdata():
    result = processing()
    if result == False:
        logging.error("Data not filter")
        return False
    else:
        try:
            origins = []
            uniquedata = []
            for item in result:
                if item['origin'] not in origins:
                    origins.append(item['origin'])

            for origin in origins:
                database = dataScraper.objects.filter(origindata=origin)
                for item in result:
                    if item['origin'] == origin:
                        erase = False
                        for row in database:
                            score = fuzz.ratio(item['content'], row.content)
                            if score == 100:
                                erase = True
                        if erase == False:
                            uniquedata.append(item)
        except:
            logging.error("Data not found and not filter")
            return False

    return uniquedata




# Notification
# model is clean and insertion of new data in model notification
def notification():
    #clean model before insert
    newsletter.objects.all().delete()

    result = filterdata()
    if result == False:
        logging.error("Data not insert in model notification")
    else:
        logging.info("{} data insert in model notification".format(len(result)))
        for item in result:
            newsletter.objects.create(title=item['content'])



# function insert new data in model
def database():
    result = filterdata()
    if result == False:
        logging.error("Data not insert in database")
    else:
        logging.info("{} data insert in database".format(len(result)))
        for item in result:
            dataScraper.objects.create(urldata=item['url'], content=item['content'], origindata=item['origin'])
