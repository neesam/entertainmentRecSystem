const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`); // Logs the method and URL
    next();
});

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
});

// whichTable

app.get('/api/whichMusicTable', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM music_tables."whichTable" order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/whichFilmTable', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "filmTables"."whichTable" order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Album/artist tables

app.get('/api/musicTable1', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM music_tables."musicTable1" order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/musicTable2', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM music_tables."musicTable2" order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/musicTable3', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM music_tables."musicTable3" order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/musicTable4', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM music_tables."musicTable4" order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/musicTable5', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM music_tables."musicTable5" order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/wantToListen', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM music_tables."wantToListen" order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// film

app.get('/api/film_visualhypnagogia', async (req, res) => {
    try {
        const result = await pool.query('select * from "filmTables"."film_visualhypnagogia" order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/film_ebert', async (req, res) => {
    try {
        const result = await pool.query('select * from "filmTables"."film_ebert" order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/film_imdb250', async (req, res) => {
    try {
        const result = await pool.query('select * from "filmTables"."film_imdb250" order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/film_towatch', async (req, res) => {
    try {
        const result = await pool.query('select * from "filmTables"."film_towatch" order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/filmrecs', async (req, res) => {
    try {
        const result = await pool.query('select * from "filmTables"."filmrecs" order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/film_rymtop1500', async (req, res) => {
    try {
        const result = await pool.query('select * from "filmTables"."film_rymtop1500" order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// shows

app.get('/api/shows', async (req, res) => {
    try {
        const result = await pool.query('select * from "shows"."shows" order by random() limit 1')
        res.json(result.rows)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

// app.delete('/api/shows/:id', async (req, res) => {
//     const showId = parseInt(req.params.id);
//     console.log(showId, '------> from server')

//     try {
//         const result = await pool.query('delete from "shows"."shows" where id = $1', [showId])

//         if (result.rowCount === 0) {
//             return res.status(404).send('Show not found')
//         }
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send('Server Error')
//     }
// })

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});