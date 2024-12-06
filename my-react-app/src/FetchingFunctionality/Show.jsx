import render, {useEffect} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";

import EntCard from '../Components/Card';

const Show = ({isStaticMode}) => {

    const [show, setShow] = useState('')
    const [backgroundColor, setBackgroundColor] = useState('')


    useEffect(() => {
        const showValue = localStorage.getItem('show')
        setShow(showValue)

        const showBackgroundColor = localStorage.getItem('showBackgroundColor');
        setBackgroundColor(showBackgroundColor)
    }, []);

    const fetchShow = async () => {
        const response = await fetch(`http://localhost:5001/api/shows`)
        if (!response.ok) {
            throw new Error(`Failed to fetch details for shows`);
        }
        const data = await response.json()

        setShow(data[0]['show'])
        localStorage.setItem('show', data[0]['show'])

        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        const rgb1 = randomIntFromInterval(190, 255)
        const rgb2 = randomIntFromInterval(190, 255)
        const rgb3 = randomIntFromInterval(190, 255)

        const bgColor = 'rgb(' + rgb1 + ',' + rgb2 + ',' + rgb3 + ')'

        setBackgroundColor(bgColor)
        localStorage.setItem('showBackgroundColor', bgColor)

    }

    const deleteShow = async () => {
        console.log(show)
        // console.log(`Requesting DELETE for show ID: ${show.id}`);
        // try {
        //     const response = await fetch(`http://localhost:5001/api/shows/${show.id}`, {
        //         method: 'DELETE'
        //     })

        //     const data = await response.json()
        //     console.log(data[0])
        // } catch (err) {
        //     console.log(err.message);
        // }
        // fetchShow()
    }

    return (
        <EntCard 
            attributes={{ color: isStaticMode ? backgroundColor : 'skyblue', title: show, type: 'show' }}
            clickFunction={fetchShow}
            deleteFunction={deleteShow}
         />
    )
}

export default Show