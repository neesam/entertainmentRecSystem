import React, {useState} from 'react';
import Album from "../FetchingFunctionality/Album";
import Show from '../FetchingFunctionality/Show';
import Film from "../FetchingFunctionality/Film";
import renderChart from "../Components/Chart";
import GetAttributesForRYMAlbum from "../FetchingFunctionality/Attributes";
import NavBar from "../Components/Nav";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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

  return (
      <>
          {/* <NavBar/> */}
          <Album/>
          <Film/>
          <Show/>
      </>
  );
};

export default Current;