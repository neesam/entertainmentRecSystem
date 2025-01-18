import json
import os
import requests
import base64
import sys
from datetime import datetime
from google.cloud import bigquery

from dotenv import load_dotenv

load_dotenv()

# ENVIRONMENT VARIABLES

BQ_SERVICE_ACCOUNT = os.getenv('BQ_SERVICE_ACCOUNT')
BQ_PROJECT = os.getenv('BQ_PROJECT')

METADATA_DATASET= os.getenv('METADATA_DATASET')

TMDB_API_KEY = os.getenv('TMDB_API_KEY')
GOOGLE_BOOKS_API_KEY = os.getenv('GOOGLE_BOOKS_API_KEY')

FILM_METADATA_TABLE = os.getenv('FILM_METADATA_TABLE')
FILM_RECS_METADATA_TABLE = os.getenv('FILM_RECS_METADATA_TABLE')
SHOW_METADATA_TABLE = os.getenv('SHOW_METADATA_TABLE')
SHOW_RECS_METADATA_TABLE = os.getenv('SHOW_RECS_METADATA_TABLE')
MUSIC_METADATA_TABLE = os.getenv('MUSIC_METADATA_TABLE')
BOOK_METADATA_TABLE = os.getenv('BOOK_METADATA_TABLE')
QUEUE_TABLE = os.getenv('QUEUE_TABLE')

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
                    
                    if 'genres' in search_results and search_results['genres']:
                        genres_list = []
                        for i, j in enumerate(search_results['genres']):
                            genres_list.append(search_results['genres'][i].capitalize())

                        print(genres_list)

                        try:
                            # Initialize BigQuery client with project ID and credentials
                            client = bigquery.Client.from_service_account_json(f"{BQ_SERVICE_ACCOUNT}", project=f"{BQ_PROJECT}")

                            # Define the query
                            QUERY = f'''
                                UPDATE
                                `{METADATA_DATASET}.music_metadata`
                                SET artist_genres = {genres_list}
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
                film_title = i[1]

                def getMovieData():

                    genres_map = {
                        28: 'Action',
                        12: 'Adventure',
                        16: 'Animation',
                        35: 'Comedy',
                        80: 'Crime',
                        99: 'Documentary',
                        18: 'Drama',
                        10751: 'Family',
                        14: 'Fantasy',
                        36: 'History',
                        27: 'Horror',
                        10402: 'Music',
                        9648: 'Mystery',
                        10749: 'Romance',
                        878: 'Science Fiction',
                        10770: 'TV Movie',
                        53: 'Thriller',
                        10752: 'War',
                        37: 'Western',
                    }

                    url = f'https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&query={film_title}'
                    response = requests.get(url)
                    if response.status_code == 200:
                        # Parse the response JSON
                        data = response.json()
                        
                        # Check if there are any results
                        if data['results']:
                            # Get the first movie from the results
                            movie = data['results'][0]

                            title = movie['title']
                            id = movie['id']
                            overview = movie['overview']
                            release_date = movie['release_date']
                            vote_avg = movie['vote_average']
                            vote_count = movie['vote_count']
                            genres = movie['genre_ids']
                            poster_path = movie['poster_path']
                            url = f'https://image.tmdb.org/t/p/w500{poster_path}'

                            genres_list = []

                            for i, j in genres_map.items():
                                if i in genres:
                                    genres_list.append(genres_map[i])
                                    
                            try:
                                # Initialize BigQuery client with project ID and credentials
                                client = bigquery.Client.from_service_account_json(f"{BQ_SERVICE_ACCOUNT}", project=f"{BQ_PROJECT}")

                                # Define the query
                                QUERY = f'''
                                    INSERT INTO
                                    `{METADATA_DATASET}.{FILM_METADATA_TABLE}`
                                    (title, overview, release_date, poster_path, genres, vote_avg, vote_count)
                                    VALUES
                                    ('{title}', "{overview}", '{release_date}', '{url}', {genres_list}, '{vote_avg}', '{vote_count}')
                                '''

                                print(QUERY)
                                # Run the query
                                query_job = client.query(QUERY)
                                query_job.result()

                            except Exception as e:
                                print(f"Error executing query: {e}")

                            url = f'https://api.themoviedb.org/3/movie/{id}/recommendations?api_key={TMDB_API_KEY}'
                            response = requests.get(url)
                            data = response.json()
                            
                            if data['results']:
                                for i in data['results']:
                                    title = i['title']
                                    overview = i['overview']
                                    poster_path = i['poster_path']
                                    url = f'https://image.tmdb.org/t/p/w500{poster_path}'
                                    genres = i['genre_ids']
                                    release_date = i['release_date']
                                    vote_avg = i['vote_average']
                                    vote_count = i['vote_count']

                                    genres_list = []

                                    for i, j in genres_map.items():
                                        if i in genres:
                                            genres_list.append(genres_map[i])

                                    try:
                                        # Initialize BigQuery client with project ID and credentials
                                        client = bigquery.Client.from_service_account_json(f"{BQ_SERVICE_ACCOUNT}", project=f"{BQ_PROJECT}")

                                        # Define the query
                                        QUERY = f'''
                                            INSERT INTO
                                            `{METADATA_DATASET}.{FILM_RECS_METADATA_TABLE}`
                                            (original_film_id, title, overview, poster_path, genres, release_date, vote_avg, vote_count)
                                            VALUES
                                            ('{id}', '{title}', "{overview}", '{url}', {genres_list}, '{release_date}', '{vote_avg}', '{vote_count}')
                                        '''

                                        print(QUERY)
                                        # Run the query
                                        query_job = client.query(QUERY)
                                        query_job.result()

                                    except Exception as e:
                                        print(f"Error executing query: {e}")
                            else:
                                print('No recommendations found.')
                        else:
                            print('No movies found.')
                    else:
                        print(f"Error: Unable to fetch data (Status code: {response.status_code})")

                getMovieData()
            elif i[2] == 'show':

                show_title = i[1]

                def search_tv_show(api_key, query, page=1):
                    url = f"https://api.themoviedb.org/3/search/tv"
                    
                    params = {
                        'api_key': api_key,
                        'query': query,
                        'page': page
                    }
                    
                    response = requests.get(url, params=params)
                    
                    if response.status_code == 200:
                        data = response.json()
                        return data['results']
                    else:
                        print(f"Error: {response.status_code}")
                        return None
                    
                def getShowDetails():

                    genres_map = {
                        10759: 'Action & Adventure',
                        16: 'Animation',
                        35: 'Comedy',
                        80: 'Crime',
                        99: 'Documentary',
                        18: 'Drama',
                        10751: 'Family',
                        10762: 'Kids',
                        9648: 'Mystery',
                        10763: 'News',
                        10764: 'Reality',
                        10765: 'Science Fiction & Fantasy',
                        10766: 'Soap',
                        10767: 'Talk',
                        10768: 'War & Politics',
                        37: 'Western'
                    }
                        
                    api_key = TMDB_API_KEY # Replace with your actual TMDb API key
                    query = show_title  # The TV show you're searching for

                    tv_show = search_tv_show(api_key, query)

                    if tv_show:
                        for i in tv_show:
                            id = i['id']
                            title = i['name']
                            overview = i['overview']
                            overview_cleaned = overview.replace("\n", " ")
                            first_air_date = i['first_air_date']
                            vote_avg = i['vote_average']
                            poster_path = i['poster_path']
                            poster_url = f'https://image.tmdb.org/t/p/w500{poster_path}'
                            genres = i['genre_ids']

                            genres_list = []

                            for i, j in genres_map.items():
                                if i in genres:
                                    genres_list.append(genres_map[i])

                            if '"' in overview_cleaned:
                                overview_cleaned = overview_cleaned.replace('"', '\\"')

                            try:
                                # Initialize BigQuery client with project ID and credentials
                                client = bigquery.Client.from_service_account_json(f"{BQ_SERVICE_ACCOUNT}", project=f"{BQ_PROJECT}")

                                # Define the query
                                QUERY = f'''
                                    INSERT INTO
                                    `{METADATA_DATASET}.{SHOW_METADATA_TABLE}`
                                    (title, overview, first_air_date, vote_avg, poster_url, genres)
                                    VALUES
                                    ('{title}', "{overview_cleaned}", '{first_air_date}', '{vote_avg}', '{poster_url}', {genres_list})
                                '''
                                print(QUERY)
                                # Run the query
                                query_job = client.query(QUERY)
                                query_job.result()

                            except Exception as e:
                                print(f"Error executing query: {e}")

                            url = f'https://api.themoviedb.org/3/tv/{id}/recommendations?api_key={TMDB_API_KEY}&total_results=10'
                            response = requests.get(url)
                            data = response.json()
                            
                            if data['results']:
                                for i in data['results']:
                                    title = i['name']
                                    overview = i['overview']
                                    overview_cleaned = overview.replace("\n", " ")
                                    poster_path = i['poster_path']
                                    url = f'https://image.tmdb.org/t/p/w500{poster_path}'
                                    genres = i['genre_ids']
                                    release_date = i['first_air_date']
                                    vote_avg = i['vote_average']
                                    vote_count = i['vote_count']

                                    genres_list = []

                                    for i, j in genres_map.items():
                                        if i in genres:
                                            genres_list.append(genres_map[i])

                                    if '"' in overview_cleaned:
                                        overview_cleaned = overview_cleaned.replace('"', '\\"')

                                    try:
                                        # Initialize BigQuery client with project ID and credentials
                                        client = bigquery.Client.from_service_account_json(f"{BQ_SERVICE_ACCOUNT}", project=f"{BQ_PROJECT}")

                                        # Define the query
                                        QUERY = f'''
                                            INSERT INTO
                                            `{METADATA_DATASET}.{SHOW_RECS_METADATA_TABLE}`
                                            (original_show_id, title, overview, poster_path, genres, release_date, vote_avg, vote_count)
                                            VALUES
                                            ('{id}', '{title}', "{overview_cleaned}", '{url}', {genres_list}, '{release_date}', '{vote_avg}', '{vote_count}')
                                        '''

                                        print(QUERY)
                                        # Run the query
                                        query_job = client.query(QUERY)
                                        query_job.result()

                                    except Exception as e:
                                        print(f"Error executing query: {e}")
                            else:
                                print('No recommendations found.')
                    else:
                        print('No show found.')
                getShowDetails()
            else:
                book_title = i[1]

                def getBookDetails():

                    response = requests.get(f'https://www.googleapis.com/books/v1/volumes?q={book_title}&key={GOOGLE_BOOKS_API_KEY}')
                    
                    if response.status_code == 200:
                        data = response.json()
                        item = data['items'][0]
                        
                        authors = item['volumeInfo']['authors']
                        genres = item['volumeInfo']['categories']
                        description = item['volumeInfo']['imageLinks']['thumbnail']
                        previewLink = item['accessInfo']['webReaderLink']
                        title = item['volumeInfo']['title']
                        pageCount = item['volumeInfo']['pageCount']

                        if '"' in description:
                            description = description.replace('"', '\\"')

                        try:
                            # Initialize BigQuery client with project ID and credentials
                            client = bigquery.Client.from_service_account_json(f"{BQ_SERVICE_ACCOUNT}", project=f"{BQ_PROJECT}")

                            # Define the query
                            QUERY = f'''
                                INSERT INTO
                                `{METADATA_DATASET}.{BOOK_METADATA_TABLE}`
                                (title, authors, description, genres, page_count, preview_link)
                                VALUES
                                ('{title}', {authors}, "{description}", {genres}, '{pageCount}', '{previewLink}')
                            '''
                            print(QUERY)
                            # Run the query
                            query_job = client.query(QUERY)
                            query_job.result()

                        except Exception as e:
                            print(f"Error executing query: {e}")
                    else:
                        print(f"Failed to retrieve data. Status code: {response.status_code}")            

                getBookDetails()
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