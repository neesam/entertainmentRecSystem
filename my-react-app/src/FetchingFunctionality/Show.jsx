import render, {useEffect} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";

import EntCard from '../Components/Card';

import randomColor from '../Helper/randomColor';


const Show = ({isStaticMode}) => {

    const [show, setShow] = useState()
    const [showID, setShowID] = useState('')
    const [backgroundColor, setBackgroundColor] = useState('')
    const tables = ['shows']


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

        setShow(data[0]['string_field_0'])
        setShowID(data[0]['int64_field_1'])
        localStorage.setItem('show', data[0]['string_field_0'])

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
        fetchShow()
    }

    return (
        <EntCard 
            attributes={{ color: isStaticMode ? backgroundColor : 'skyblue', title: show, type: 'show', tables: tables }}
            clickFunction={fetchShow}
            deleteFunction={deleteShow}
        />
    )
}

export default Show