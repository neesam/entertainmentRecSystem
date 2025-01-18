import json
import os
import requests
import base64
import sys
from datetime import datetime

from google.cloud import bigquery
from dotenv import load_dotenv

from ApiHelpers.Music import getAlbumData
from ApiHelpers.Music import getArtistData
from ApiHelpers.Film import getMovieData
from ApiHelpers.Show import getShowDetails
from ApiHelpers.Book import getBookDetails
from Pipeline import extract
from Pipeline import deleteFromQueue

load_dotenv()

def apiCalls(data):
    for i in data:
        if i[2] == 'album':
            artist_id = getAlbumData.getAlbumData(i)
            getArtistData.getArtistData(artist_id)
        elif i[2] == 'film':            
            getMovieData.getMovieData(i)
        elif i[2] == 'show':
            getShowDetails.getShowDetails(i)
        else:
            getBookDetails.getBookDetails(i)

data = extract.extract()
apiCalls(data)
deleteFromQueue.deleteFromQueue()