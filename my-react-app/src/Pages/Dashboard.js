import React, {useState} from 'react';
import Album from "../FetchingFunctionality/Album";
import Film from "../FetchingFunctionality/Film";
import renderChart from "../Components/Chart";
import GetAttributesForRYMAlbum from "../FetchingFunctionality/Attributes";
import NavBar from "../Components/Nav";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    // const [albumTitle, setAlbumTitle] = useState('')
    const [randomAlbumTracks, setRandomAlbumTracks] = useState([])
    const [randomAlbumTrackAttributes, setRandomAlbumTrackAttributes] = useState([])
    const [randomAlbumChartData, setRandomAlbumChartData] = useState([])
    const [randomRYMPlaylistAlbumID, setRandomRYMPlaylistAlbumID] = useState('')
    const [selectedAttribute, setSelectedAttribute] = useState('');

    const { albumTracks, albumTrackAttributes, chartData, RYMPlaylistAlbumID } = GetAttributesForRYMAlbum();

  return (
      <>
          <NavBar/>
        <Album/>
        <Film/>
        <canvas id="myChart" width="50px" height="50px"></canvas>
      </>
  );
};

export default Dashboard;