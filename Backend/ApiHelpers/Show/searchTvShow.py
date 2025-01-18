import requests

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