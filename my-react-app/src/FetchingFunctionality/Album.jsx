import render, {useEffect} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";

import EntCard from '../Components/Card';

import randomColor from '../Helper/randomColor';

const Album = ({isStaticMode}) => {

    const CLIENT_ID = "6c8c67a752cb4098b34ac5e6865f76a3"
    const REDIRECT_URI = "http://localhost:3000/"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState('')

    const [whichTable, setWhichTable] = useState('')
    const [album, setAlbum] = useState('')
    const [tablesUsed, setTablesUsed] = useState([])
    const [backgroundColor, setBackgroundColor] = useState('')


    useEffect(() => {

        // Logic to retrieve token from Spotify

        // const hash = window.location.hash
        // let token = window.localStorage.getItem("token")

        // if (!token && hash) {
        //     token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        //     window.location.hash = ""
        //     window.localStorage.setItem("token", token)
        // }

        // if (token) {
        //     let btn = document.querySelector('.spotify-login-button');
        //     btn.style.display = 'none'
        // }

        // setToken(token)

        const albumValue = localStorage.getItem('album')
        setAlbum(albumValue)

        const whichTableValue = localStorage.getItem('whichTable')
        setWhichTable(whichTableValue)

        const albumBackgroundColor = localStorage.getItem('albumBackgroundColor');
        setBackgroundColor(albumBackgroundColor)

        if (isStaticMode === false) {
            const randColor = randomColor()
            setBackgroundColor(randColor)
            localStorage.setItem('albumBackgroundColor', randColor);
        }
    }, []);

    const getAlbum = async () => {

        // const getSpotifyDataForAlbum = async () => {
        //     const response = await fetch('https://api.spotify.com/v1/search', {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         },
        //         params: {
        //             q: searchKey,
        //             type: "artist"
        //         }
        //     })
        // }

        // Function to fetch actual album

        const fetchAlbumFromWhichTable = async (whichTable) => {
            const response = await fetch(`http://localhost:5001/api/${whichTable}`)
            if (!response.ok) {
                throw new Error(`Failed to fetch details for ${whichTable}`);
            }
            const data = await response.json()

            setAlbum(data[0]['string_field_0'])
            localStorage.setItem('album', data[0]['string_field_0'])

            // Logic to change background on each button press

            const bgColor = randomColor()
            setBackgroundColor(bgColor)
            localStorage.setItem('albumBackgroundColor', bgColor)
        }

        // Function to retrieve specific table

        const fetchWhichTable = async () => {

            let localTablesUsed = [...tablesUsed];

            if (localTablesUsed.length === 6) {
                localTablesUsed = []
                setTablesUsed([])
            }

            let tableUsed = false

            while (!tableUsed) {

                const response = await fetch('http://localhost:5001/api/whichMusicTable');

                if (!response.ok) {
                    throw new Error('Failed to fetch whichTable');
                }

                const data = await response.json()
                const fetchedTable = data[0]['string_field_0']
                console.log(fetchedTable)

                if (!localTablesUsed.includes(fetchedTable)) {

                    tableUsed = true

                    setWhichTable(fetchedTable)

                    localTablesUsed.push(fetchedTable);
                    setTablesUsed(localTablesUsed);
                    console.log('After update:', [...tablesUsed, fetchedTable]);

                    localStorage.setItem('whichMusicTable', fetchedTable)

                    if (data.length > 0) {
                        fetchAlbumFromWhichTable(fetchedTable); // Assuming data is an array and we're using the first item
                    }
                }
            }
        }

        fetchWhichTable();
    }

    return (
        <>
        <EntCard 
            attributes={{ color: isStaticMode ? backgroundColor : 'white', title: album, type: 'album' }}
            clickFunction={getAlbum}
         />
        {/* <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            className="spotify-login-button">
        </a> */}
         </>
    )
}

export default Album