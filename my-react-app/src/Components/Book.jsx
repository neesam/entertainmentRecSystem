import render, {useEffect} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";

import EntCard from './Card';

import randomColor from '../Helper/randomColor';

const Book = ({isStaticMode}) => {

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

        // Function to fetch actual book

        const response = await fetch(`http://localhost:5001/api/book_toread`)
        if (!response.ok) {
            throw new Error(`Failed to fetch details for book_toread`);
        }
        const data = await response.json()

        console.log(data)

        setBook(data[0]['string_field_0'])
        localStorage.setItem('book', data[0]['string_field_0'])

        // Logic to change background on each button press

        const bgColor = randomColor()
        setBackgroundColor(bgColor)
        localStorage.setItem('bookBackgroundColor', bgColor)

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

    return (
        <>
        <EntCard 
            attributes={{ color: isStaticMode ? backgroundColor : 'beige', title: book, type: 'book', tables: tables }}
            clickFunction={getBook}
            submitForm={getFromSpecificTable}
         />
         </>
    )
}

export default Book