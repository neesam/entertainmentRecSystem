import render, {useEffect} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";

const Album = () => {

    const [whichList, setWhichList] = useState('')
    const [album, setAlbum] = useState('')

    useEffect(() => {
        const albumValue = localStorage.getItem('Album')
        setAlbum(albumValue)

        const whichListValue = localStorage.getItem('whichList')
        setWhichList(whichListValue)
    }, []);

    const getAlbum = async () => {
        const fetchAlbumFromWhichList = async (whichList) => {
            const response = await fetch(`http://localhost:5001/api/album_tolisten`)
            if (!response.ok) {
                throw new Error(`Failed to fetch details for ${whichList}`);
            }
            const data = await response.json()

            setAlbum(data[0]['album'])
            localStorage.setItem('Album', data[0]['album'])
        }

        const fetchWhichList = async () => {
            const response = await fetch('http://localhost:5001/api/whichList');
            if (!response.ok) {
                throw new Error('Failed to fetch whichList');
            }
            const data = await response.json()
            setWhichList(data[0]['list'])
            localStorage.setItem('whichList', data[0]['list'])
            if (data.length > 0) {
                fetchAlbumFromWhichList(data[0]['list']); // Assuming data is an array and we're using the first item
            }
        }

        fetchWhichList();
    }

    return (
        <Card style={{width: '18rem', margin: '50px', padding: '10px', display: 'flex', flexDirection: "column"}}>
            <Card.Body>
                <Card.Title>{album}</Card.Title>
                <Card.Subtitle>album_tolisten</Card.Subtitle>
            </Card.Body>
            <div>
                <Button style={{marginLeft: '5%', marginRight: '5%', marginBottom: '5%'}} onClick={getAlbum}>Get
                    album</Button>
            </div>
        </Card>
    )
}

export default Album