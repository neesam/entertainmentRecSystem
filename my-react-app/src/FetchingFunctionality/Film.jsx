import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Film = () => {

    const [film, setFilm] = useState('')

    useEffect(() => {
        let filmInStorage = localStorage.getItem('Film')
        setFilm(filmInStorage)
    }, []);
    
    const fetchFilm = async () => {
        const response = await fetch('http://localhost:5001/api/film_visualhypnagogia');
        if (!response.ok) {
            throw new Error('Fuck');
        }
        const data = await response.json()

        setFilm(data[0]['film'])
        localStorage.setItem('Film', data[0]['film'])
    }

    return (
        <Card style={{ width: '18rem', margin: '50px', padding: '10px', display: 'flex', flexDirection: "column"}}>
            <Card.Body>
                <Card.Title>{film}</Card.Title>
            </Card.Body>
            <div>
                <Button style={{ marginLeft: '5%', marginRight: '5%', marginBottom: '5%'}} onClick={fetchFilm}>Get film</Button>
            </div>
        </Card>
    )
}

export default Film;