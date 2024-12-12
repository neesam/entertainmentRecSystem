import { useState } from 'react';

import React from 'react';

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'


const EntCard = ({ clickFunction, deleteFunction, attributes, submitForm }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState(""); // State for dropdown selection

    const handleModalOpen = () => setShowModal(true);
    const handleModalClose = () => {
        if (selectedOption) {
            submitForm(selectedOption);
        }
        setShowModal(false);
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '25vh',
            backgroundColor: attributes.color 
        }}>
            <Card style={{
                width: '50vw',
                margin: '50px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative' 
            }}>
                <Button
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 1
                    }}
                    variant="outline-secondary"
                    onClick={handleModalOpen}>
                    &#9998; 
                </Button>

                <Card.Body>
                    <Card.Title>{attributes.title}</Card.Title>
                </Card.Body>
                <div>
                    <Button
                        style={{ marginLeft: '5%', marginRight: '5%', marginBottom: '3%' }}
                        onClick={clickFunction}>
                        Get {attributes.type}
                    </Button>
                    <Button
                        style={{ marginRight: '5%', marginBottom: '3%' }}
                        variant='danger'
                        onClick={deleteFunction}>
                        Delete {attributes.type}
                    </Button>
                </div>
            </Card>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    {attributes.type === 'album' ? (
                        <Modal.Title>
                        Get an {attributes.type} from a specific table
                        </Modal.Title>
                    ) : 
                        <Modal.Title>
                        Get a {attributes.type} from a specific table
                        </Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                <Form>
                        <Form.Group controlId="formDropdown">
                            <Form.Label>Choose an Option</Form.Label>
                            <Form.Control as="select" value={selectedOption} onChange={handleOptionChange}>
                                <option value="">-- Select an option --</option>
                                {attributes.tables.map((table, index) => (
                                    <option key={index} value={table}>
                                        {table}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleModalClose();
                    }}>
                        Get {attributes.type}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EntCard;