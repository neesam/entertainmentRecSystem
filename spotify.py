import spotipy
from spotipy.oauth2 import SpotifyOAuth
import csv

# Replace with your Spotify API credentials
CLIENT_ID = '344cada2d66645b6ac09039fe9414c6b'
CLIENT_SECRET = '53a97f3023c541018c169a156ecd2095'
REDIRECT_URI = 'http://localhost:3000/'  # Can be any valid URI

# Define the scope to access playlist data
SCOPE = 'playlist-read-private'

def get_album_titles(playlist_id):
    # Authenticate with Spotify
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=CLIENT_ID,
                                                   client_secret=CLIENT_SECRET,
                                                   redirect_uri=REDIRECT_URI,
                                                   scope=SCOPE))
    # Fetch the playlist
    album_titles = set()
    offset = 0
    limit = 100  # Spotify allows a maximum of 100 items per request

    while True:
        # Fetch playlist tracks with pagination
        results = sp.playlist_tracks(playlist_id, offset=offset, limit=limit)
        tracks = results['items']

        # Break the loop if no more tracks are found
        if not tracks:
            break

        # Extract album titles from the tracks
        for item in tracks:
            track = item['track']
            if track and 'album' in track:
                album_titles.add(track['artists'][0]['name'] + ' - ' + track['album']['name'])

        # Update offset for the next batch
        offset += limit

    return album_titles

def save_to_csv(album_titles, csv_filename):
    with open(csv_filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Album Title'])  # Header
        for album in album_titles:
            writer.writerow([album])
    print(f"CSV saved as {csv_filename}")


if __name__ == "__main__":
    # Replace with the playlist ID or Spotify URI of your playlist
    playlist_id = '7x7QOMWOhEmstoB0wLabYS'
    
    album_titles = get_album_titles(playlist_id)
    save_to_csv(album_titles, 'sos.csv')
