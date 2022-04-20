#from .models import dataScraper
#from .models import website
import os
import logging

# path log
dir_path = os.path.dirname(os.path.realpath(__file__))
filename = os.path.join(dir_path, 'scraping_from_n8n.log')

#logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

file_handler = logging.FileHandler(filename)
file_handler.setLevel(logging.INFO)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
logger.addHandler(file_handler)


def do_logging():
    try:
        res = 5/5
        logger.info("515 ont été scraper")
    except:
        logger.critical("Erreur lors de scraping")

# function send request and receive data

# function for manipulate data

# function insert data in model


if __name__ == '__main__':
    do_logging()