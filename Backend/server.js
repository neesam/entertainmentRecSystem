const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
});

// WhichList
app.get('/api/whichList', async (req, res) => {
    try {
        const result = await pool.query('select * from public.which_musiclist order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Album/artist tables
app.get('/api/album_4nhalfstar', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_4nhalfstar order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_4star', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_4star order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_5star', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_5star order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_allgenres', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_allgenres order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_brokentransmission', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_brokentransmission order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_createdbyrejection', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_createdbyrejection order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_emo', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_emo order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_emoautumn', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_emoautumn order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_greatscene', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_greatscene order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_guysfavemoalbums', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_guysfavemoalbums order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_hopelessrecords', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_hopelessrecords order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_indiepop', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_indiepop order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_magicsheet', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_magicsheet order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_moenieandkitchie', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_moenieandkitchie order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_popalbums', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_popalbums order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_risecore', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_risecore order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_rymrecs', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_rymrecs order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_sceneessentials', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_sceneessentials order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_tolisten', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_tolisten order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/album_vaporwave', async (req, res) => {
    try {
        const result = await pool.query('select * from public.album_vaporwave order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/artist_4or5', async (req, res) => {
    try {
        const result = await pool.query('select * from public.artist_4or5 order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/artist_4star', async (req, res) => {
    try {
        const result = await pool.query('select * from public.artist_4star order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/artist_female_voice', async (req, res) => {
    try {
        const result = await pool.query('select * from public.artist_female_voice order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/artist_roughguide', async (req, res) => {
    try {
        const result = await pool.query('select * from public.artist_roughguide order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/artist_spotifyliked', async (req, res) => {
    try {
        const result = await pool.query('select * from public.artist_spotifyliked order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// film

app.get('/api/film_visualhypnagogia', async (req, res) => {
    try {
        const result = await pool.query('select * from public.film_visualhypnagogia order by random() limit 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});