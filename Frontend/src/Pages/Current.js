import React, {useState, useEffect} from 'react';

import Album from "../Components/Album";
import Show from '../Components/Show';
import Film from "../Components/Film";
import Book from '../Components/Book';

import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';

const Current = () => {
    // const [albumTitle, setAlbumTitle] = useState('')
    // const [randomAlbumTracks, setRandomAlbumTracks] = useState([])
    // const [randomAlbumTrackAttributes, setRandomAlbumTrackAttributes] = useState([])
    // const [randomAlbumChartData, setRandomAlbumChartData] = useState([])
    // const [randomRYMPlaylistAlbumID, setRandomRYMPlaylistAlbumID] = useState('')
    // const [selectedAttribute, setSelectedAttribute] = useState('');

    // const { albumTracks, albumTrackAttributes, chartData, RYMPlaylistAlbumID } = GetAttributesForRYMAlbum();

    const [staticMode, setIsStaticMode] = useState('')

    useEffect(() => {

        const mode = localStorage.getItem('staticMode')

        if (!mode) {
            setIsStaticMode(false)
            localStorage.setItem('mode', false)
        } else {
            setIsStaticMode(mode)
        }

    }, []);

    const toggleStaticMode = () => {
        setIsStaticMode((prevMode) => !prevMode);
        localStorage.setItem('staticMode', !staticMode)
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`http://localhost:5001/api/pipeline/`);
            console.log(res.data); // assuming your response is the output from Python
        } catch (error) {
            console.error("Error in API call", error);
        }
    };

    return (
    <>
        <button
            onClick={toggleStaticMode}
            className="change-theme-button">
                {staticMode ? 'Static colors' : 'Random colors'}
        </button>
        <button
            onClick={handleSubmit}
            className="pipeline-button">
                Run pipeline
        </button>
        <Album isStaticMode={staticMode}/>
        <Film isStaticMode={staticMode}/>
        <Show isStaticMode={staticMode}/>
        <Book isStaticMode={staticMode}/>
    </>
  );
};

export default Current;