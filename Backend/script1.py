import json
import sys
from google.cloud import bigquery

key_path = "/Users/anees/entertainmentRecSystem/musiccataloginghelper-617e9549b056.json"

try:
    # Initialize BigQuery client with project ID and credentials
    client = bigquery.Client.from_service_account_json(key_path, project="musiccataloginghelper")

    # Define the query
    QUERY = '''
        SELECT string_field_0 
        from `musicTables.album_inCirculation`
    '''

    # Run the query
    query_job = client.query(QUERY)
    rows = query_job.result()

    # Collect the result into a list
    result = [{"name": row.string_field_0} for row in rows]

    print(result)
except Exception as e:
    print(f"Error executing query: {e}")
# input_data = sys.stdin.read()

# data = json.loads(input_data)
# album = data.get('album', '')

# output = f'Recieved album: {album}'
# print(json.dumps(output))