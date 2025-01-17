import json
import os
import requests
import base64
import sys
from datetime import datetime
from google.cloud import bigquery

from dotenv import load_dotenv

from ApiHelpers import spotifyApi

load_dotenv()

# ENVIRONMENT VARIABLES

BQ_SERVICE_ACCOUNT = os.getenv('BQ_SERVICE_ACCOUNT')
BQ_PROJECT = os.getenv('BQ_PROJECT')
METADATA_DATASET= os.getenv('METADATA_DATASET')
QUEUE_TABLE = os.getenv('QUEUE_TABLE')
MUSIC_METADATA_TABLE = os.getenv('MUSIC_METADATA_TABLE')

# SPOTIFY API

access_token = spotifyApi.getSpotifyToken()

def extract():
    try:
        # Initialize BigQuery client with project ID and credentials
        client = bigquery.Client.from_service_account_json(f"{BQ_SERVICE_ACCOUNT}", project=f"{BQ_PROJECT}")

        # Define the query
        QUERY = f'''
            SELECT * 
            from `{METADATA_DATASET}.{QUEUE_TABLE}`
        '''

        # Run the query
        query_job = client.query(QUERY)
        rows = query_job.result()

        # Collect the result into a list
        return [row for row in rows]
    except Exception as e:
        print(f"Error executing query: {e}")

def apiCalls(data):

    for i in data:
        if i[2] == 'album':
            
            # Spotify search logic

            search_url = 'https://api.spotify.com/v1/search'

            # Query to get album info

            def getAlbumData():

                query = i[1]
                search_type = 'album'
                limit = 1

                headers = {
                    'Authorization': f'Bearer {access_token}'
                }

                params = {
                    'q': query,  
                    'type': search_type,  
                    'limit': limit  
                }

                search_response = requests.get(search_url, headers=headers, params=params)
                search_results = search_response.json()

                for item in search_results['albums']['items']:
                    # print(json.dumps(item, indent=3))
                    artist_name = item['artists'][0]['name']
                    artist_id = item['artists'][0]['id']
                    artist_url = item['artists'][0]['external_urls']['spotify']
                    album_name = item['name']
                    album_url = item['external_urls']['spotify']
                    release_date = item['release_date']
                    image_url = item['images'][0]['url']

                release_date = datetime.strptime(release_date, "%Y-%m-%d")
                formatted_release_date = release_date.strftime("%B %d, %Y")


                try:
                    # Initialize BigQuery client with project ID and credentials
                    client = bigquery.Client.from_service_account_json(f"{BQ_SERVICE_ACCOUNT}", project=f"{BQ_PROJECT}")

                    # Define the query
                    QUERY = f'''
                        INSERT INTO
                        `{METADATA_DATASET}.{MUSIC_METADATA_TABLE}`
                        (artist_name, artist_id, artist_url, album_name, album_url, release_date, image_url)
                        VALUES
                        ('{artist_name}', '{artist_id}', '{artist_url}', '{album_name}', '{album_url}', '{formatted_release_date}', '{image_url}')
                    '''

                    # Run the query
                    query_job = client.query(QUERY)
                    query_job.result()

                    return artist_id

                except Exception as e:
                    print(f"Error executing query: {e}")

            def getArtistData(artist_id):

                print(f"Artist ID: {artist_id}")

                endpoint = f'https://api.spotify.com/v1/artists/{artist_id}'

                query = artist_id
                search_type = 'artist'
                limit = 1

                headers = {
                    'Authorization': f'Bearer {access_token}'
                }

                params = {
                    'q': query,  
                    'type': search_type,  
                    'limit': limit  
                }

                search_response = requests.get(endpoint, headers=headers, params=params)
                search_results = search_response.json()
                
                if len(search_results['genres']) >= 1:
                    genre = search_results['genres'][0].capitalize()

                    try:
                        # Initialize BigQuery client with project ID and credentials
                        client = bigquery.Client.from_service_account_json(f"{BQ_SERVICE_ACCOUNT}", project=f"{BQ_PROJECT}")

                        # Define the query
                        QUERY = f'''
                            UPDATE
                            `{METADATA_DATASET}.music_metadata`
                            SET artist_genre = '{genre}'
                            WHERE artist_id = '{artist_id}'
                        '''

                        # Run the query
                        query_job = client.query(QUERY)
                        query_job.result()

                    except Exception as e:
                        print(f"Error executing query: {e}")

            artist_id = getAlbumData()
            getArtistData(artist_id)

        elif i[2] == 'film':
            # tmdb logic for film
            print('film')
        elif i[2] == 'book':
            # google books logic
            print('book')
        else:
            # tmdb logic for show
            print('show')

def deleteFromQueue():
    try:
        # Initialize BigQuery client with project ID and credentials
        client = bigquery.Client.from_service_account_json(f"{BQ_SERVICE_ACCOUNT}", project=f"{BQ_PROJECT}")

        # Define the query
        QUERY = f'''
            DELETE 
            from `{METADATA_DATASET}.{QUEUE_TABLE}`
            WHERE 1 = 1
        '''

        # Run the query
        query_job = client.query(QUERY)
        query_job.result()

    except Exception as e:
        print(f"Error executing query: {e}")

data = extract()
apiCalls(data)
deleteFromQueue()