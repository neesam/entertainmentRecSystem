import {useEffect} from 'react'
import React, {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';

import EntCard from './Card';

import randomColor from '../Helper/randomColor';

const Book = ({isStaticMode}) => {

    const [book, setBook] = useState('')
    const [bookID, setBookID] = useState('')
    const [backgroundColor, setBackgroundColor] = useState('')

    useEffect(() => {

        const bookValue = localStorage.getItem('book')
        setBook(bookValue)

        const bookIDValue = localStorage.getItem('bookID')
        setBookID(bookIDValue)

        const bookBackgroundColor = localStorage.getItem('bookBackgroundColor');
        setBackgroundColor(bookBackgroundColor)

        if (isStaticMode === false) {
            const randColor = randomColor()
            setBackgroundColor(randColor)
            localStorage.setItem('bookBackgroundColor', randColor);
        }
    }, []);

    const getBook = async () => {

        const response = await fetch(`http://localhost:5001/api/book_toread`)

            if (!response.ok) {
                throw new Error(`Failed to fetch details`);
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

            if(anthologies.includes(data[0]['title'])) {
                const getRandomInt =(min, max) => {
                    const minCeiled = Math.ceil(min);
                    const maxFloored = Math.floor(max);
                    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
                }       
                setBookID(data[0]['id'])
                setBook(data[0]['title'] + ' ' + getRandomInt(2, 5))
                localStorage.setItem('book', data[0]['title'] + ' ' + getRandomInt(2, 5))
                localStorage.setItem('bookID', data[0]['id'])
            } else {
                setBookID(data[0]['id'])
                setBook(data[0]['title'])
                localStorage.setItem('book', data[0]['title'])
                localStorage.setItem('bookID', data[0]['id'])
            }

            // Logic to change background on each button press

            const bgColor = randomColor()
            setBackgroundColor(bgColor)
            localStorage.setItem('bookBackgroundColor', bgColor)

    }

    const deleteBook = async () => {
        try {
        
            const response = await fetch(`http://localhost:5001/api/book_toread/${bookID}`, {
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

        toast('Deleted book!', {
            autoClose: 2000,
            theme: "light",
            });

        getBook()
    };

    const addToQueue = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/addBookToQueue/${book}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Post failed: ${errorData.message || 'Unknown error'}`);
            }

            console.log(await response.json());
            console.log('Book added successfully.');
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
                    color: isStaticMode ? backgroundColor : 'beige', 
                    title: book, 
                    type: 'book', 
                }}
                clickFunction={getBook}
                deleteFunction={deleteBook}
                addToQueue={addToQueue}
            />
            <ToastContainer />
        </>
    )
}

export default Book