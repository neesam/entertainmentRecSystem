import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import spotifyAuthHelper from "../SpotifyHelper/AuthHelper";
import Card from "react-bootstrap/Card";

const SpotifySearch = () => {

    const [results, setResults] = useState([])
    const [albumTracks, setAlbumTracks] = useState([])

    const handleInputChange = async (event) => {
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

        const q = event.target.value
        console.log(q)

        const resultsUrl = `https://api.spotify.com/v1/search?q=${q}&type=album`;
        const resultsResponse = await fetch(resultsUrl, { headers });
        if (!resultsResponse.ok) {
            throw new Error("Failed to fetch results");
        }
        const resultsData = await resultsResponse.json();
        console.log(resultsData.albums.items)
        setResults(resultsData.albums.items)
    }

    const handleClick = async (value) => {
        try {
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

            // Fetch RYM playlist data
            const RYMPlaylistResult = await fetch('https://api.spotify.com/v1/me', { headers });
                const userInfo = await RYMPlaylistResult.json();
                console.log('Granted Scopes:', userInfo.scope);
            const RYMPlaylistData = await RYMPlaylistResult.json()
            const RYMPlaylistId = RYMPlaylistData.id
            console.log('RYMPlaylistId: ', RYMPlaylistId)

            // Fetch album tracks
            const albumUrl = `https://api.spotify.com/v1/albums/${value}/tracks`;
            const albumResponse = await fetch(albumUrl, { headers });
            if (!albumResponse.ok) {
                throw new Error("Failed to fetch album");
            }
            const albumTracksData = await albumResponse.json();
            const albumTracks = albumTracksData.items;

            // Fetch track names
            const trackTitlePromises = albumTracks.map(async track => {
                const trackTitleResponse = await fetch(`https://api.spotify.com/v1/tracks/${track.id}`, { headers });
                if (!trackTitleResponse.ok) {
                    throw new Error('Failed to get RYM track name');
                }
                const trackTitleData = await trackTitleResponse.json();
                return trackTitleData.id;
            });

            const trackTitles = await Promise.all(trackTitlePromises);
            console.log(trackTitles)

            // Update state with track titles
            setAlbumTracks(trackTitles);

            for(let i of albumTracks) {
                const options = {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ uris: [i.uri] })
                }

                const response = await fetch(`https://api.spotify.com/v1/playlists/${RYMPlaylistId}/tracks`, options)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <>
            <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control onChange={handleInputChange} aria-label="Search bar" />
            </InputGroup>

            {results.map((i) => (
                    <Card onClick={() => handleClick(i.id)} style={{padding: '2%', backgroundColor: `rgb(229, 204, 255)`}}>
                        <Card.Title><b>{i.name}</b> | {i.artists[0].name}</Card.Title>
                        <img style={{height: '40%', width: '30%', borderRadius: '5%'}} src={`${i.images[0].url}`}/>
                    </Card>
            ))}
        </>
    )
}

export default SpotifySearch;