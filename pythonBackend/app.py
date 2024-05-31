from flask import Flask
from flask_cors import CORS
from flask import jsonify
import random

app = Flask(__name__)
CORS(app)

@app.route('/api/randomAlbumID')
def get_data():
    idk = ''
    lines = open('RYM.csv').read().splitlines()
    myline = random.choice(lines)
    return jsonify(myline)

if __name__ == '__main__':
    app.run(debug=True)
