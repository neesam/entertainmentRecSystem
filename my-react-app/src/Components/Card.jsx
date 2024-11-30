import React from 'react';

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


const EntCard = ({clickFunction, deleteFunction, attributes}) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '33.35vh',
            backgroundColor: attributes.color // Optional background color
        }}>
            <Card style={{
                width: '50vw', 
                margin: '50px', 
                padding: '10px', 
                display: 'flex', 
                flexDirection: "column"
            }}>
                <Card.Body>
                    <Card.Title>{attributes.title}</Card.Title>
                    <Card.Subtitle>{attributes.type}</Card.Subtitle>
                </Card.Body>
                <div>
                    <Button 
                        style={{marginLeft: '5%', marginRight: '5%', marginBottom: '5%'}} 
                        onClick={clickFunction}>
                        Get {attributes.type}
                    </Button>
                    {/* <Button 
                        style={{marginLeft: '5%', marginRight: '5%', marginBottom: '5%'}} 
                        variant='danger'
                        onClick={deleteFunction}>
                        Delete {attributes.type}
                    </Button> */}
                </div>
            </Card>
        </div>
    )
}

export default EntCard;