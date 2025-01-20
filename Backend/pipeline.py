import json
import os
import requests
import base64
import sys
from datetime import datetime

from google.cloud import bigquery
from dotenv import load_dotenv

from ApiHelpers.Music.musicData import getAlbumData
from ApiHelpers.Music.musicData import getArtistData
from ApiHelpers.Film.movieData import getMovieData
from ApiHelpers.Show.showData import getShowDetails
from ApiHelpers.Book.bookDetails import getBookDetails
from Pipeline.extractionLogic import extract
from Pipeline.queueDelete import deleteFromQueue

load_dotenv()

def apiCalls(data):
    for i in data:
        if i[2] == 'album':
            artist_id = getAlbumData(i)
            getArtistData(artist_id)
        elif i[2] == 'film':            
            getMovieData(i)
        elif i[2] == 'show':
            getShowDetails(i)
        else:
            getBookDetails(i)

data = extract()
apiCalls(data)
deleteFromQueue()