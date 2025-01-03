import {useEffect} from 'react'
import React, {useState} from "react";

import EntCard from './Card';

import randomColor from '../Helper/randomColor';

const Book = ({isStaticMode}) => {

    const [whichTable, setWhichTable] = useState('')
    const [book, setBook] = useState('')
    const [bookID, setBookID] = useState('')
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

        const bookIDValue = localStorage.getItem('bookID')
        setBook(bookIDValue)

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
            const response = await fetch(`http://localhost:5001/api/${whichTable}`)

            if (!response.ok) {
                throw new Error(`Failed to fetch details for book_toread`);
            }

            const data = await response.json()

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
                setBookID(data[0]['id'])
                setBook(data[0]['string_field_0'] + ' ' + Math.floor(Math.random(1) * 5))
                localStorage.setItem('book', data[0]['string_field_0'] + ' ' + Math.floor(Math.random(1) * 5))
                localStorage.setItem('bookID', bookID)
            } else if((whichTable === 'penguin_modern' || whichTable === 'penguin_classics')) {
                setBookID(data[0]['id'])
                setBook(whichTable + ' ' + bookID)
                localStorage.setItem('book', whichTable + ' ' + bookID)
                localStorage.setItem('bookID', bookID)
            } else {
                setBookID(data[0]['id'])
                setBook(data[0]['string_field_0'])
                localStorage.setItem('book', data[0]['string_field_0'])
                localStorage.setItem('bookID', bookID)
            }

            // Logic to change background on each button press

            const bgColor = randomColor()
            setBackgroundColor(bgColor)
            localStorage.setItem('bookBackgroundColor', bgColor)

    }

        const fetchWhichTable = async () => {

            let localTablesUsed = [...tablesUsed];

            if (localTablesUsed.length === 3) {
                localTablesUsed = []
                setTablesUsed([])
            }

            let tableUsed = false

            while (!tableUsed) {

                const response = await fetch('http://localhost:5001/api/whichBookTable');

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

                    localStorage.setItem('whichBookTable', fetchedTable)

                    if (data.length > 0) {
                        fetchBookFromWhichTable(fetchedTable); 
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

            if((specificTable === 'penguin_modern' || specificTable === 'penguin_classics')) {
                setBookID(data[0]['id'])
                setBook(specificTable + ' ' + bookID)
                localStorage.setItem('book', specificTable + ' ' + bookID)
                localStorage.setItem('bookID', bookID)
            } else {
                setBookID(data[0]['id'])
                setBook(data[0]['string_field_0'])
                localStorage.setItem('book', data[0]['string_field_0'])
                localStorage.setItem('bookID', bookID)
            }

            // Logic to change background on each button press

            const bgColor = randomColor()
            setBackgroundColor(bgColor)
            localStorage.setItem('bookBackgroundColor', bgColor)
    }

    const deleteBook = async () => {
        try {
        
            const response = await fetch(`http://localhost:5001/api/books/${bookID}/${whichTable}`, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Delete failed: ${errorData.message || 'Unknown error'}`);
            }

            console.log(await response.json());
            console.log('Book deleted successfully.');
        } catch (error) {
            console.error('Error during deletion:', error.message);
        }

        getBook()
    };

    return (
        <>
        <EntCard 
            attributes={{ color: isStaticMode ? backgroundColor : 'beige', title: book, type: 'book', tables: tables }}
            clickFunction={getBook}
            submitForm={getFromSpecificTable}
            deleteFunction={deleteBook}
        />
        </>
    )
}

export default Book