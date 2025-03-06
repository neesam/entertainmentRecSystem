import {useEffect} from 'react'
import React, {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';

import EntCard from './Card';

import randomColor from '../Helper/randomColor';

const Album = ({isStaticMode}) => {

    const [whichTable, setWhichTable] = useState('')
    const [album, setAlbum] = useState('')
    const [albumID, setAlbumID] = useState('')
    const [inCirculation, setInCirculation] = useState('')
    const [originalTable, setOriginalTable] = useState('')
    const [tablesUsed, setTablesUsed] = useState([])
    const [backgroundColor, setBackgroundColor] = useState('')

    const tables = [
        'album_2011vwave',
        'album_allgenres',
        'album_ambientvaporwave',
        'album_barberbeats',
        'album_bedroomAOR',
        'album_bodylinesources',
        'album_brokentransmission',
        'artist_classicalComposer',
        'album_chicagoschool',
        'album_corpsources',
        'album_createdbyrejection',
        'album_deathdream',
        'album_dreamytranscendent',
        'album_emo',
        'album_futurefunk',
        'album_emoautumn',
        'album_greatscene',
        'album_guysfavemoalbums',
        'album_hopelessrecords',
        'album_inCirculation',
        'album_indiepop',
        'album_latenightlofi',
        'album_luxelitesources',
        'album_magicsheet',
        'album_mallsoft',
        'album_moenieandkitchie',
        'album_popalbums',
        'album_risecore',
        'album_rymrecs',
        'album_rymsuggestions',
        'album_slushwave',
        'album_soundsofspotify',
        'album_tolisten',
        'album_telepath',
        'artist_topartists',
        'album_vaporwave',
        'album_vhspop',
        'album_vinyls',
        'album_waterfrontdiningsources',
        'album_waterloggedEars'
    ]


    useEffect(() => {

        const albumValue = localStorage.getItem('album')
        setAlbum(albumValue)

        const albumIDValue = localStorage.getItem('albumID')
        setAlbumID(albumIDValue)

        const inCirculationValue = localStorage.getItem('in_circulation')
        setInCirculation(inCirculationValue)

        const originalTableValue = localStorage.getItem('original_album_table')
        setOriginalTable(originalTableValue)

        const whichTableValue = localStorage.getItem('whichMusicTable')
        setWhichTable(whichTableValue)

        const albumBackgroundColor = localStorage.getItem('albumBackgroundColor');
        setBackgroundColor(albumBackgroundColor)

        if (isStaticMode === false) {
            const randColor = randomColor()
            setBackgroundColor(randColor)
            localStorage.setItem('albumBackgroundColor', randColor);
        }

    }, [localStorage.getItem('album')]);

    const getAlbum = async () => {

        // Function to fetch actual album

        const fetchAlbumFromWhichTable = async (whichTable) => {
            const response = await fetch(`http://localhost:5001/api/${whichTable}`)
            if (!response.ok) {
                throw new Error(`Failed to fetch details for ${whichTable}`);
            }
            const data = await response.json()

            console.log(data[0]['id'])

            if(data[0]['link']) {
                localStorage.setItem('album', data[0]['link'])
            } else {
                localStorage.setItem('album', data[0]['title'])
                localStorage.setItem('albumID', data[0]['id'])
            }

            localStorage.setItem('in_circulation', 'false')
            
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

                const response = await fetch('http://localhost:5001/api/whichMusicTable');

                if (!response.ok) {
                    throw new Error('Failed to fetch whichTable');
                }

                const data = await response.json()
                const fetchedTable = data[0]['title']
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

            if(data[0]['link']) {
                localStorage.setItem('album', data[0]['link'])
            } else {
                localStorage.setItem('album', data[0]['title'])
                localStorage.setItem('albumID', data[0]['id'])
            }

            localStorage.setItem('whichMusicTable', specificTable)

            if(data[0]['in_circulation']) {
                localStorage.setItem('in_circulation', data[0]['in_circulation'])
            } else {
                localStorage.setItem('in_circulation', 'false')
            }

            if(data[0]['original_table']) {
                localStorage.setItem('original_album_table', data[0]['original_table'])
            } else {
                localStorage.setItem('original_album_table', null)
            }

            // Logic to change background on each button press

            const bgColor = randomColor()
            localStorage.setItem('albumBackgroundColor', bgColor)
    }

    const deleteAlbum = async () => {
        if(inCirculation === null) {
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
                
                getAlbum()

            } catch (error) {
                console.error('Error during deletion:', error.message);
            }
        } else {
            try {
                const response = await fetch(`http://localhost:5001/api/albums/${albumID}/${album}/${originalTable}`, {
                    method: 'DELETE',
                    headers: { 'Content-type': 'application/json' },
                });
        
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Delete failed: ${errorData.message || 'Unknown error'}`);
                }
    
                console.log(await response.json());
                console.log('Album deleted successfully.');

                // setInCirculation('false')

                getAlbum()
            } catch (error) {
                console.error('Error during deletion:', error.message);
            }
        }

        toast('Deleted album!', {
            autoClose: 2000,
            theme: "light",
            });
    };

    const addToCirculation = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/addToCirculation/${album}/${whichTable}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Post failed: ${errorData.message || 'Unknown error'}`);
            }

            console.log(await response.json());
            console.log('Album added successfully.');
        } catch (error) {
            console.error('Error during deletion:', error.message);
        }

        toast('Added to inCirculation!', {
            autoClose: 2000,
            theme: "light",
            });

        setInCirculation('true')
        localStorage.setItem('in_circulation', 'true')
    }

    const addToQueue = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/addAlbumToQueue/${album}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Post failed: ${errorData.message || 'Unknown error'}`);
            }

            console.log(await response.json());
            console.log('Album added successfully.');
        } catch(error) {
            console.error('Error in API call', error);
        }

        toast('Added to queue!', {
            autoClose: 2000,
            theme: "light",
            });
    }    

    return (
        <>
            <EntCard 
                attributes={{ 
                    color: isStaticMode ? backgroundColor : 'white', 
                    title: album, 
                    type: 'album', 
                    tables: tables, 
                    table: whichTable, 
                    inCirculation: inCirculation,
                }}
                clickFunction={getAlbum}
                submitTablesForm={getFromSpecificTable}
                // submitCirculationForm={setAlbumToCirculation}
                deleteFunction={deleteAlbum}
                addToCirculation={addToCirculation}
                addToQueue={addToQueue}
                setEntry={setAlbum}
                setAlbumID={setAlbumID}
            />
            <ToastContainer />
        </>
    )
}

export default Album