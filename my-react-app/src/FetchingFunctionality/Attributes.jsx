import spotifyAuthHelper from "../SpotifyHelper/AuthHelper";
import { useEffect, useState } from "react";

const GetAttributesForRYMAlbum = () => {
    const [albumTracks, setAlbumTracks] = useState([]);
    const [albumTrackAttributes, setAlbumTrackAttributes] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [RYMPlaylistAlbumID, setRYMPlaylistAlbumID] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/randomAlbumID');
                if (!response.ok) {
                    throw new Error("Can't get album ID");
                }
                const data = await response.json();
                setRYMPlaylistAlbumID(data);

                const [authUrl, requestOptions] = spotifyAuthHelper();
                const authResponse = await fetch(authUrl, requestOptions);
                if (!authResponse.ok) {
                    throw new Error("Failed to authenticate");
                }
                const authResponseData = await authResponse.json();
                const accessToken = authResponseData.access_token;
                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                };

                const albumUrl = `https://api.spotify.com/v1/albums/${data}/tracks`;
                const albumResponse = await fetch(albumUrl, { headers });
                if (!albumResponse.ok) {
                    throw new Error("Failed to fetch album");
                }
                const albumData = await albumResponse.json();
                setAlbumTracks(albumData.items);

                // Fetch audio features for all tracks concurrently
                const audioFeaturePromises = albumData.items.map(async track => {
                    const trackResponse = await fetch(`https://api.spotify.com/v1/audio-features/${track.id}`, { headers });
                    if (!trackResponse.ok) {
                        throw new Error('Failed to fetch track');
                    }
                    const trackData = await trackResponse.json();
                    return trackData;
                });

                // Fetch track titles for all tracks concurrently
                const trackTitlePromises = albumData.items.map(async track => {
                    const trackTitleResponse = await fetch(`https://api.spotify.com/v1/tracks/${track.id}`, { headers });
                    if (!trackTitleResponse.ok) {
                        throw new Error('Failed to get RYM track name');
                    }
                    const data = await trackTitleResponse.json();
                    return data['name'];
                });

                const [audioFeatures, trackTitles] = await Promise.all([Promise.all(audioFeaturePromises), Promise.all(trackTitlePromises)]);
                setAlbumTrackAttributes(audioFeatures);
                setChartData(audioFeatures);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData(); // Call fetchData inside useEffect
    }, []); // Empty dependency array to run only once

    return { albumTracks, albumTrackAttributes, chartData, RYMPlaylistAlbumID };
};

export default GetAttributesForRYMAlbum;
