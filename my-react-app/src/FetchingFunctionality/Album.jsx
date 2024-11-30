import render, {useEffect} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";

import EntCard from '../Components/Card';

const Album = () => {

    const [whichTable, setWhichTable] = useState('')
    const [album, setAlbum] = useState('')
    const [tablesUsed, setTablesUsed] = useState([])
    const [backgroundColor, setBackgroundColor] = useState('')


    useEffect(() => {
        const albumValue = localStorage.getItem('album')
        setAlbum(albumValue)

        const whichTableValue = localStorage.getItem('whichTable')
        setWhichTable(whichTableValue)

        const albumBackgroundColor = localStorage.getItem('albumBackgroundColor');
        setBackgroundColor(albumBackgroundColor)
    }, []);

    const getAlbum = async () => {
        const fetchAlbumFromWhichTable = async (whichTable) => {
            const response = await fetch(`http://localhost:5001/api/${whichTable}`)
            if (!response.ok) {
                throw new Error(`Failed to fetch details for ${whichTable}`);
            }
            const data = await response.json()

            setAlbum(data[0]['entry'])
            localStorage.setItem('album', data[0]['entry'])

            function randomIntFromInterval(min, max) { // min and max included 
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
    
            const rgb1 = randomIntFromInterval(190, 255)
            const rgb2 = randomIntFromInterval(190, 255)
            const rgb3 = randomIntFromInterval(190, 255)
    
            const bgColor = 'rgb(' + rgb1 + ',' + rgb2 + ',' + rgb3 + ')'
    
            setBackgroundColor(bgColor)
            localStorage.setItem('albumBackgroundColor', bgColor)
        }

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
                const fetchedTable = data[0]['table']
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
        <EntCard 
            attributes={{ color: backgroundColor, title: album, type: 'album' }}
            clickFunction={getAlbum}
         />
    )
}

export default Album