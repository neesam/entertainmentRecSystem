import {useEffect} from 'react'
import React, {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';

import EntCard from './Card';

import randomColor from '../Helper/randomColor';


const Show = ({isStaticMode}) => {

    const [whichTable, setWhichTable] = useState('')
    const [show, setShow] = useState()
    const [tablesUsed, setTablesUsed] = useState([])
    const [showID, setShowID] = useState('')
    const [backgroundColor, setBackgroundColor] = useState('')

    const tables = [
        'shows',
        'anime_classic',
        'anime_other'
    ]


    useEffect(() => {
        const showValue = localStorage.getItem('show')
        setShow(showValue)

        const whichTableValue = localStorage.getItem('whichShowTable')
        setWhichTable(whichTableValue)

        const showBackgroundColor = localStorage.getItem('showBackgroundColor');
        setBackgroundColor(showBackgroundColor)
    }, []);

    const getShow = async () => {

        // Function to fetch actual show

        const fetchShowFromWhichTable = async (whichTable) => {
            const response = await fetch(`http://localhost:5001/api/${whichTable}`)
            if (!response.ok) {
                throw new Error(`Failed to fetch details for ${whichTable}`);
            }
            const data = await response.json()

            console.log(data)

            setShow(data[0]['title'])
            localStorage.setItem('show', data[0]['title'])

            // Logic to change background on each button press

            const bgColor = randomColor()
            setBackgroundColor(bgColor)
            localStorage.setItem('albumBackgroundColor', bgColor)
        }

        // Function to retrieve specific table

        const fetchWhichTable = async () => {

            let localTablesUsed = [...tablesUsed];

            if (localTablesUsed.length === 3) {
                localTablesUsed = []
                setTablesUsed([])
            }

            let tableUsed = false

            while (!tableUsed) {

                const response = await fetch('http://localhost:5001/api/whichShowTable');

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

                    localStorage.setItem('whichShowTable', fetchedTable)

                    if (data.length > 0) {
                        fetchShowFromWhichTable(fetchedTable); // Assuming data is an array and we're using the first item
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

            setShow(data[0]['title'])
            localStorage.setItem('show', data[0]['title'])

            // Logic to change background on each button press

            const bgColor = randomColor()
            setBackgroundColor(bgColor)
            localStorage.setItem('showBackgroundColor', bgColor)
    }

    const deleteShow = async () => {
        console.log(showID)
        console.log(`Requesting DELETE for show ID: ${showID}`);
        try {
            const response = await fetch(`http://localhost:5001/api/shows/${showID}`, {
                method: 'DELETE'
            })

            const data = await response.json()
            console.log(data.message)
        } catch (err) {
            console.log(err.message);
        }

        toast('Deleted show!', {
            autoClose: 2000,
            theme: "light",
            });

        getShow()
    }

    const addToQueue = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/addShowToQueue/${show}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Post failed: ${errorData.message || 'Unknown error'}`);
            }

            console.log(await response.json());
            console.log('Show added successfully.');
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
                    color: isStaticMode ? backgroundColor : 'skyblue', 
                    title: show, 
                    type: 'show', 
                    tables: tables, 
                    table: whichTable }}
                clickFunction={getShow}
                deleteFunction={deleteShow}
                submitForm={getFromSpecificTable}
                addToQueue={addToQueue}
            />
            <ToastContainer />
        </>
    )
}

export default Show