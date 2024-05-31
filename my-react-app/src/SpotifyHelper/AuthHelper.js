function spotifyAuthHelper() {
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

return [authUrl, requestOptions]
}

export default spotifyAuthHelper;