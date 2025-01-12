require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {spawn} = require('child_process');
const { Pool } = require('pg');
const { BigQuery } = require('@google-cloud/bigquery');


const app = express();
const port = 5001;

const BQ_API = process.env.BQ_API;

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`); // Logs the method and URL
    next();
});

const bigquery = new BigQuery({
    keyFilename: BQ_API,
});

// PostgreSQL connection
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'postgres',
//     password: 'root',
//     port: 5432,
// });

// Run metadata pipeline

app.get('/api/pipeline', async (req, res) => {
    var dataToSend;

    const python = spawn('python3', ['/Users/anees/entertainmentRecSystem/Backend/script1.py']);
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    })

    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataToSend);
    })

    python.on('error', (err) => {
        console.error('Failed to start Python process:', err);
        res.status(500).send({ message: 'Failed to execute Python script.' });
    });
})

// whichTable

app.get('/api/whichMusicTable1', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.music_tables.whichTableMusic order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/whichFilmTable', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.film_tables.whichTableFilm order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/whichMusicTable2', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.whichMusicTable2 order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/whichShowTable', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.show_tables.whichShowTable order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/whichBookTable', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.book_tables.whichBookTable order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Album/artist tables 1

app.get('/api/musicTable1', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.music_tables.musicTable1 order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/musicTable2', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.music_tables.musicTable2 order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/musicTable3', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.music_tables.musicTable3 order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/musicTable4', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.music_tables.musicTable4 order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/musicTable5', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.music_tables.musicTable5 order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/wantToListen', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.music_tables.wantToListen order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Album tables 2

app.get('/api/album_allgenres', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_allgenres order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_bedroomAOR', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_bedroomAOR order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_brokentransmission', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_brokentransmission order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/artist_classicalComposer', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.artist_classicalComposer order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_createdbyrejection', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_createdbyrejection order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_emo', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_emo order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_emoautumn', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_emoautumn order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_greatscene', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_greatscene order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_guysfavemoalbums', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_guysfavemoalbums order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_hopelessrecords', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_hopelessrecords order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_incirculation', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_inCirculation order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_indiepop', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_indiepop order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_magicsheet', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_magicsheet order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_moenieandkitchie', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_moenieandkitchie order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_popalbums', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_popalbums order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_risecore', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_risecore order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
app.get('/api/album_rymrecs', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_rymrecs order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_tolisten', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_tolisten order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_vaporwave', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.musicTables.album_vaporwave order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// album deletion

app.delete('/api/albums/:id/:whichTable', async (req, res) => {
    const id = parseInt(req.params.id);
    const whichTable = req.params.whichTable;

    console.log(`Received DELETE request for id: ${id} from table: ${whichTable}`);


    // Construct the query to delete the row
    const query = `
        DELETE FROM \`musiccataloginghelper.musicTables.${whichTable}\`
        WHERE id  = @id
    `;

    try {
        // Run the query
        const options = {
            query,
            params: { id },
        };
        const [job] = await bigquery.createQueryJob(options);
        console.log(`Job ${job.id} started.`);

        // Wait for the query to finish
        const [rows] = await job.getQueryResults();
        console.log('Rows affected:', rows);

        if (rows.length === 0) {
            return res.status(404).send('Album not found');
        }

        res.status(200).send({ message: 'Album deleted successfully' });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).send('Server Error');
    }
});

// film

app.get('/api/film_visualhypnagogia', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.film_tables.film_visualhypnagogia order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/film_ebert', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.film_tables.film_ebert order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/film_imdb250', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.film_tables.film_imdb250 order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/film_towatch', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.film_tables.film_towatch order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/filmrecs', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.film_tables.filmrecs order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/film_rymtop1500', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.film_tables.film_rymtop1500 order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.delete('/api/film/:id/:whichTable', async (req, res) => {
    const id = parseInt(req.params.id);
    const whichTable = req.params.whichTable;

    console.log(`Received DELETE request for id: ${id} from table: ${whichTable}`);


    // Construct the query to delete the row
    const query = `
        DELETE FROM \`musiccataloginghelper.film_tables.${whichTable}\`
        WHERE id  = @id
    `;

    try {
        // Run the query
        const options = {
            query,
            params: { id },
        };
        const [job] = await bigquery.createQueryJob(options);
        console.log(`Job ${job.id} started.`);

        // Wait for the query to finish
        const [rows] = await job.getQueryResults();
        console.log('Rows affected:', rows);

        if (rows.length === 0) {
            return res.status(404).send('Film not found');
        }

        res.status(200).send({ message: 'Album deleted successfully' });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).send('Server Error');
    }
});

// shows

app.get('/api/shows', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.show_tables.shows order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

app.get('/api/anime_classic', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.show_tables.anime_classic order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

app.get('/api/anime_other', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.show_tables.anime_other order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

app.delete('/api/shows/:id', async (req, res) => {
    const showId = parseInt(req.params.id);
    console.log(`Received DELETE request for id: ${showId}`);

    try {
        const result = await pool.query('delete from "shows"."shows" where id = $1', [showId])

        if (result.rowCount === 0) {
            return res.status(404).send('Show not found')
        }

        res.status(200).send({ message: 'Show deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

// books

app.get('/api/book_toread', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.book_tables.book_toread order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

app.get('/api/penguin_classics', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.book_tables.penguin_classics order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

app.get('/api/penguin_modern', async (req, res) => {
    const sqlQuery = 'select * from musiccataloginghelper.book_tables.penguin_modern order by rand() limit 1'

    try {
        const [rows] = await bigquery.query({ query: sqlQuery });
        res.json(rows)
        console.log(rows)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

app.delete('/api/books/:id/:whichTable', async (req, res) => {
    const id = parseInt(req.params.id);
    const whichTable = req.params.whichTable;

    console.log(`Received DELETE request for id: ${id} from table: ${whichTable}`);


    // Construct the query to delete the row
    const query = `
        DELETE FROM \`musiccataloginghelper.book_tables.${whichTable}\`
        WHERE id  = @id
    `;

    try {
        // Run the query
        const options = {
            query,
            params: { id },
        };
        const [job] = await bigquery.createQueryJob(options);
        console.log(`Job ${job.id} started.`);

        // Wait for the query to finish
        const [rows] = await job.getQueryResults();
        console.log('Rows affected:', rows);

        if (rows.length === 0) {
            return res.status(404).send('Film not found');
        }

        res.status(200).send({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).send('Server Error');
    }
});

// server listening function

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});