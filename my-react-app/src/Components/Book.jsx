import render, {useEffect} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";

import EntCard from './Card';

import randomColor from '../Helper/randomColor';

const Book = ({isStaticMode}) => {

    const [whichTable, setWhichTable] = useState('')
    const [book, setBook] = useState('')
    const [tablesUsed, setTablesUsed] = useState([])
    const [backgroundColor, setBackgroundColor] = useState('')

    const tables = [
        'book_toread',
        'penguin_classics',
        'penguin_modern'
    ]

    useEffect(() => {

        const bookValue = localStorage.getItem('book')
        setBook(bookValue)

        const bookBackgroundColor = localStorage.getItem('bookBackgroundColor');
        setBackgroundColor(bookBackgroundColor)

        if (isStaticMode === false) {
            const randColor = randomColor()
            setBackgroundColor(randColor)
            localStorage.setItem('bookBackgroundColor', randColor);
        }
    }, []);

    const getBook = async () => {

        const fetchBookFromWhichTable = async (whichTable) => {
            const response = await fetch(`http://localhost:5001/api/book_toread`)
            if (!response.ok) {
                throw new Error(`Failed to fetch details for book_toread`);
            }
            const data = await response.json()

            console.log(data)

            const anthologies = [
                'ted chiang', 
                'the stars my destination',
                'greatest short stories volume 4',
                'great american short stories',
                'the treasury of english short stories',
                'mark twain short stories',
                'classic short stories',
                'everythings eventual',
                'we can remember it for you wholesale',
                'LLA1',
                'interfaces',
                'years best science fiction',
                'LLA2',
                'esquire',
                'LLA3',
                'LLA4',
                'LLA6',
                'twentieth century drama',
                'mystery and suspense',
                'ten of the best',
                'pulp fiction',
                'hitchcock',
                'ursula k le guin',
                'harlan ellison'
            ]

            if(anthologies.includes(data[0]['string_field_0'])) {
                setBook(data[0]['string_field_0'] + ' ' + Math.floor(Math.random(0) * 10))
                localStorage.setItem('book', data[0]['string_field_0'] + ' ' + Math.floor(Math.random(0) * 10))
            } else {
                setBook(data[0]['string_field_0'])
                localStorage.setItem('book', data[0]['string_field_0'])
            }

            // Logic to change background on each button press

            const bgColor = randomColor()
            setBackgroundColor(bgColor)
            localStorage.setItem('bookBackgroundColor', bgColor)

    }

        const fetchWhichTable = async () => {

            let localTablesUsed = [...tablesUsed];

            if (localTablesUsed.length === 17) {
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
                        fetchBookFromWhichTable(fetchedTable); // Assuming data is an array and we're using the first item
                    }
                }
            }
        }

        fetchWhichTable()

    }

    const getFromSpecificTable = async (specificTable) => {
        const response = await fetch(`http://localhost:5001/api/${specificTable}`)
            if (!response.ok) {
                throw new Error(`Failed to fetch details for ${specificTable}`);
            }
            const data = await response.json()

            console.log(data)

            if(data[0]['int64_field_0'] && (specificTable === 'penguin_modern' || specificTable === 'penguin_classics')) {
                setBook(specificTable + ' ' + data[0]['int64_field_0'])
                localStorage.setItem('book', specificTable + ' ' + data[0]['int64_field_0'])
            } else {
                setBook(data[0]['string_field_0'])
                localStorage.setItem('book', data[0]['string_field_0'])
            }

            // Logic to change background on each button press

            const bgColor = randomColor()
            setBackgroundColor(bgColor)
            localStorage.setItem('bookBackgroundColor', bgColor)
    }

    // const deleteBook = async () => {
    //     try {
        
    //         const response = await fetch(`http://localhost:5001/api/albums/${bookID}/${whichTable}`, {
    //             method: 'DELETE',
    //             headers: { 'Content-type': 'application/json' },
    //         });
    
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(`Delete failed: ${errorData.message || 'Unknown error'}`);
    //         }

    //         console.log(await response.json());
    //         console.log('Album deleted successfully.');
    //     } catch (error) {
    //         console.error('Error during deletion:', error.message);
    //     }

    //     getBook()
    // };

    return (
        <>
        <EntCard 
            attributes={{ color: isStaticMode ? backgroundColor : 'beige', title: book, type: 'book', tables: tables }}
            clickFunction={getBook}
            submitForm={getFromSpecificTable}
            // deleteFunction={deleteBook}
        />
        </>
    )
}

export default Book