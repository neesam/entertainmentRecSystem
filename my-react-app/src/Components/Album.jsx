import {useEffect} from 'react'
import React, {useState} from "react";

import EntCard from './Card';

import randomColor from '../Helper/randomColor';

const Album = ({isStaticMode}) => {

    const [whichTable, setWhichTable] = useState('')
    const [album, setAlbum] = useState('')
    const [albumID, setAlbumID] = useState('')
    const [inCirculation, setInCirculation] = useState(false)
    const [tablesUsed, setTablesUsed] = useState([])
    const [backgroundColor, setBackgroundColor] = useState('')

    // const tables1 = [
    //     'musicTable1', 
    //     'musicTable2', 
    //     'musicTable3', 
    //     'musicTable4', 
    //     'musicTable5'
    // ]

    const tables2 = [
        'album_allgenres',
        'album_bedroomAOR',
        'album_brokentransmission',
        'artist_classicalComposer',
        'album_createdbyrejection',
        'album_emo',
        'album_emoautumn',
        'album_greatscene',
        'album_guysfavemoalbums',
        'album_hopelessrecords',
        'album_inCirculation',
        'album_indiepop',
        'album_magicsheet',
        'album_moenieandkitchie',
        'album_popalbums',
        'album_risecore',
        'album_rymrecs',
        'album_soundsofspotify',
        'album_tolisten',
        'album_vaporwave',
        'album_waterloggedEars'
    ]


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

        const albumIDValue = localStorage.getItem('albumID')
        setAlbumID(albumIDValue)

        const whichTableValue = localStorage.getItem('whichMusicTable')
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

        // Function to fetch actual album

        const fetchAlbumFromWhichTable = async (whichTable) => {
            const response = await fetch(`http://localhost:5001/api/${whichTable}`)
            if (!response.ok) {
                throw new Error(`Failed to fetch details for ${whichTable}`);
            }
            const data = await response.json()

            console.log(data[0]['id'])

            setAlbum(data[0]['string_field_0'])
            setAlbumID(data[0]['id'])
            setInCirculation(false)
            localStorage.setItem('album', data[0]['string_field_0'])
            localStorage.setItem('albumID', data[0]['id'])

            // Logic to change background on each button press

            const bgColor = randomColor()
            setBackgroundColor(bgColor)
            localStorage.setItem('albumBackgroundColor', bgColor)
        }

        // Function to retrieve specific table

        const fetchWhichTable = async () => {

            let localTablesUsed = [...tablesUsed];

            if (localTablesUsed.length === 20) {
                localTablesUsed = []
                setTablesUsed([])
            }

            let tableUsed = false

            while (!tableUsed) {

                const response = await fetch('http://localhost:5001/api/whichMusicTable2');

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

    const getFromSpecificTable = async (specificTable) => {
        const response = await fetch(`http://localhost:5001/api/${specificTable}`)
            if (!response.ok) {
                throw new Error(`Failed to fetch details for ${specificTable}`);
            }
            const data = await response.json()

            console.log(data)

            setAlbum(data[0]['string_field_0'])
            setAlbumID(data[0]['id'])
            setWhichTable(specificTable)
            localStorage.setItem('album', data[0]['string_field_0'])
            localStorage.setItem('albumID', albumID)
            localStorage.setItem('whichMusicTable', specificTable)

            // Logic to change background on each button press

            const bgColor = randomColor()
            setBackgroundColor(bgColor)
            localStorage.setItem('albumBackgroundColor', bgColor)
    }

    const deleteAlbum = async () => {
        try {
        
            const response = await fetch(`http://localhost:5001/api/albums/${albumID}/${whichTable}`, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Delete failed: ${errorData.message || 'Unknown error'}`);
            }

            console.log(await response.json());
            console.log('Album deleted successfully.');
        } catch (error) {
            console.error('Error during deletion:', error.message);
        }

        getAlbum()
    };

    const addToCirculation = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/addToCirculation/${album}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Post failed: ${errorData.message || 'Unknown error'}`);
            }

            console.log(await response.json());
            console.log('Album added successfully.');

            setInCirculation(true)
        } catch (error) {
            console.error('Error during deletion:', error.message);
        }
    }
    

    return (
        <>
        <EntCard 
            attributes={{ color: isStaticMode ? backgroundColor : 'white', title: album, type: 'album', tables: tables2, table: whichTable, inCirculation: inCirculation }}
            clickFunction={getAlbum}
            submitForm={getFromSpecificTable}
            deleteFunction={deleteAlbum}
            addToCirculation={addToCirculation}
         />
        {/* <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            className="spotify-login-button">
        </a> */}
         </>
    )
}

export default Album