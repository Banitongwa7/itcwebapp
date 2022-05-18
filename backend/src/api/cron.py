import os
import logging
from datetime import datetime
import requests
import json
import re
from django.core.mail import send_mail
from api.models import dataScraper, notification, newsletter
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
logging.basicConfig(level=logging.INFO,
                    filename = filename,
                    filemode="a",
                    format='%(asctime)s -> %(levelname)s -> %(message)s')


# function send request and receive data
# Return liste des listes(par endpoint) des dict
def datafromscraping():
    try:
        webhooks = [
            #"http://localhost:5678/webhook/61cd2546-882f-4ea2-8cbc-eaf330daa8ea", # site 1
            #"http://localhost:5678/webhook-test/f067c9a7-92ce-4bf2-ace5-edc0f72acfe6", # site 2
            #"http://localhost:5678/webhook-test/ec7d5f46-87e8-46c1-8510-853bd606e30c", # site 3
            #"http://localhost:5678/webhook/d132994e-73fa-47a1-b55c-99542bce6a66", # site 4
            #"http://localhost:5678/webhook/ef9df6d4-3c0e-43c4-a79b-62ffc6d35ae0", # site 5
            #"http://localhost:5678/webhook/e194db08-b867-442d-bfa1-5bb2f89137e9" # site 6

            # test
            "http://localhost:5678/webhook-test/f067c9a7-92ce-4bf2-ace5-edc0f72acfe6",
            "http://localhost:5678/webhook-test/5dc32222-643d-4161-95cf-27ced39791e3"
        ]
        try:
            data = []
            for endpoint in webhooks:
                resp = requests.get(endpoint)
                if resp.status_code == 200:
                    data.append(json.loads(resp.content))
                else:
                    site = webhooks.index(endpoint) + 2
                    logging.error("Request error on endpoint : {} Site {}".format(endpoint, site))
        except:
            logging.critical("Request from webhooks error")
            return False

        return data
    except:
        logging.critical("Error from function datafromscraping")
        return False

# function for manipulate data
# return liste des dict clean
def processing():
    try:
        data1 = datafromscraping()
        data2 = []
        # Regex
        remtag = re.compile('<.*?>')

        if data1 == False:
            logging.error("Data not clean")
            return False
        else:
            try:
                nbr = 0
                for row in data1:
                    for item in row:
                        # for item in data1:
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
                    nbr = nbr + len(row)
                logging.info("{} data was extract".format(nbr))
            except:
                logging.error("Data not found and not clean")
                return False
            return data2
    except:
        logging.critical("Error from function processing")
        return False


# Trie before insert
# return liste des dict unique and not exist in database
def filterdata():
    try:

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

                    if database.exists():
                        for item in result:
                            if item['origin'] == origin:
                                erase = False
                                for row in database:
                                    score = fuzz.ratio(item['content'], row.content)
                                    if score == 100:
                                        erase = True
                                if erase == False:
                                    uniquedata.append(item)
                    else:
                        for item in result:
                            if item['origin'] == origin:
                                uniquedata.append(item)

            except:
                logging.error("Data not found and not filter")
                return False

        return uniquedata
    except:
        logging.critical("Error from function filterdata")
        return False




def database():
    result = filterdata()

    if result == False:
        logging.error("Data not insert in database")
        logging.error("Data not insert in model notification")
    else:
        origins = []
        for item in result:
            dataScraper.objects.create(urldata=item['url'], content=item['content'], origindata=item['origin'])
            if item['origin'] not in origins:
                origins.append(item['origin'])
        logging.info("{} data insert in database".format(len(result)))

        # Notification
        # update of newnotif field model before insert

        notification.objects.filter(newnotif=True).update(newnotif=False)

        for origin in origins:
            nbr = 0
            for item in result:
                if item['origin'] == origin:
                    nbr = nbr + 1
                total = str(nbr)
            link = str(origin)
            notification.objects.create(number=total, website=link)
        logging.info("{} notification des nouvelles data".format(len(result)))
    """
    
    try:
        # Send email to all subscribers newsletters
        subscribers = newsletter.objects.all()
        notifs = notification.objects.all()

        # message to send to all subscribers
        message = ""
        for line in notifs:
            # transform website
            url = str(line.website)
            res = url.split('//', 1)[1].split('/')
            urlfinal = res[0]

            datenotif = str(line.datenotification)

            # transform time
            time = str(line.time)
            res1 = time.split(':', 2)
            if (len(res1) == 3):
                del res1[2]
            timefinal = " h ".join(res1)
            message +=  "- " + str(line.number) + " nouvelles offres d'appels ont été scrapés sur le site " + str(urlfinal) + " à "+ str(timefinal) + ". \n"

        # date of notification
        newsdate = datetime.strptime(datenotif, "%Y-%m-%d")

        for user in subscribers:
            send_mail("ITC Newsletter {}".format(str(newsdate.strftime("%x"))),
                      "Bonjour {} \n Voici les nouveautés du jour : \n {} Merci et excelente journée.".format(user.fullname, message),
                      "zonetmp18@gmail.com", ["{}".format(user.emailInscript)], fail_silently=False)
    except:
        logging.error("La newsletter n'a pas été envoyé")
        """
