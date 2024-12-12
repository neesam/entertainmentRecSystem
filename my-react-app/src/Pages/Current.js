import React, {useState, useEffect} from 'react';
import Album from "../Components/Album";
import Show from '../Components/Show';
import Film from "../Components/Film";
import Book from '../Components/Book';
import renderChart from "../Components/Chart";
// import GetAttributesForRYMAlbum from "../FetchingFunctionality/Attributes";
import NavBar from "../Components/Nav";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpotifySearch from "../Components/SpotifySearch";

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

  return (
      <>
        <button
            onClick={toggleStaticMode}
            className="spotify-login-button">
                {staticMode ? 'Static colors' : 'Random colors'}
        </button>
        <Album isStaticMode={staticMode}/>
        <Film isStaticMode={staticMode}/>
        <Show isStaticMode={staticMode}/>
        <Book isStaticMode={staticMode}/>
      </>
  );
};

export default Current;