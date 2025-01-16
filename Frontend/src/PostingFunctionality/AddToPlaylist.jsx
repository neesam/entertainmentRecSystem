function addToRYMPlaylist() {
    const authUrl = "https://accounts.spotify.com/api/token";

// Construct the request body
    const requestBody = {
        grant_type: "client_credentials",
        client_id: "3e4265b5b8be4f2db848b5544fcb7a5c",
        client_secret: "cb09d4cbe64c420a9cb5994b9f5bda83"
    };

// Set up the fetch request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded" // SpotifyHelper API requires 'application/x-www-form-urlencoded' content type
        },
        body: new URLSearchParams(requestBody).toString() // Convert request body to URL-encoded format
    };

// Send the fetch request
    fetch(authUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to authenticate");
            }
            return response.json();
        })
        .then(authResponseData => {
            const tracks = []
            const accessToken = authResponseData.access_token;
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            };
            const albumUrl = "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks";
            const fetchAlbumTracks = async (url) => {
                while (url) {
                    const albumResponse = await fetch(url, { headers });
                    if (!albumResponse.ok) {
                        throw new Error("Failed to fetch album");
                    }
                    const albumData = await albumResponse.json();
                    tracks.push(...albumData.items);
                    url = albumData.next;
                }
            };

            const playlistId = "https://api.spotify.com/v1/playlist/2SGW5aO6eNibN1xHWkb7EX";

            const addTracksToPlaylist = async (playlistId, tracks) => {
                const addTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

                const requestOptions = {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ uris: tracks })
                };

                try {
                    const response = await fetch(addTracksUrl, requestOptions);
                    if (!response.ok) {
                        throw new Error("Failed to add tracks to playlist");
                    }
                    console.log("Tracks added to playlist successfully");
                } catch (error) {
                    console.error("Error adding tracks to playlist:", error);
                }
            };

            addTracksToPlaylist(playlistId, tracks);

// Fetch playlist tracks
            fetchAlbumTracks(albumUrl)
                .then((tracks) => {
                    console.log("Album tracks:", tracks);
                })
                .catch((error) => {
                    console.error("Error fetching album tracks:", error);
                });
            console.log(headers);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

export default addToRYMPlaylist;