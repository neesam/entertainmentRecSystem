import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import React from 'react';

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'


const EntCard = ({ 
        clickFunction, 
        deleteFunction, 
        addToCirculation, 
        allInCirculation, 
        addToQueue, 
        attributes, 
        submitTablesForm,
        submitCirculationForm
    }) => {
        
    const [showTablesModal, setShowTablesModal] = useState(false);
    const [showCirculationModal, setShowCirculationModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState(""); // State for dropdown selection

    const handleTablesModalOpen = () => setShowTablesModal(true);

    const handleTablesModalHide = () => setShowTablesModal(false)

    const handleTablesModalClose = () => {
        if (selectedOption) {
            submitTablesForm(selectedOption);
        }
        setShowTablesModal(false);
    }

    // const handleCirculationModalOpen = () => {
    //     setShowCirculationModal(true);
    // } 

    // const handleCirculationModalHide = () => setShowCirculationModal(false)

    // const handleCirculationModalClose = () => {
    //     if (selectedOption) {
    //         submitCirculationForm(selectedOption);
    //     }
    //     setShowCirculationModal(false);
    // }

    const handleOptionChange = (event) => setSelectedOption(event.target.value);

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
                    onClick={handleTablesModalOpen}>
                    &#9998; 
                </Button>

                {/* {attributes.type === 'album' ? (
                    <Button
                        style={{
                            position: 'absolute',
                            top: '65px',
                            right: '10px',
                            zIndex: 1
                        }}
                        variant="outline-secondary"
                        onClick={handleCirculationModalOpen}>
                        &#x1F4BB; 
                    </Button>
                ):<></>} */}

                <Button
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        zIndex: 1
                    }}
                    variant="outline-info"
                    onClick={addToQueue}>
                    &#43; 
                </Button>

                <Card.Body>
                    <Card.Title>{attributes.title}</Card.Title>
                    <Card.Title style={{fontSize: '10px'}}>{attributes.table}</Card.Title>
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
                    {attributes.type === 'album' && attributes.inCirculation === 'false' ? (
                        <Button
                        style={{ marginRight: '5%', marginBottom: '3%' }}
                        variant='light'
                        onClick={addToCirculation}>
                        Add to inCirculation
                    </Button>
                    ) : <></>}
                </div>
            </Card>

            {/* {attributes.type === 'album' ? (
                <Modal show={showCirculationModal} onHide={handleCirculationModalHide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Albums in circulation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                        <Form.Group controlId="formDropdown">
                            <Form.Label>Choose an album</Form.Label>
                            <Form.Control as="select" value={selectedOption} onChange={handleOptionChange}>
                                <option value="">-- Select an option --</option>
                                {attributes.allInCirculation.map((title, index) => (
                                    <option key={index} value={title}>
                                        {title}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCirculationModalHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCirculationModalClose}>
                        Set album
                    </Button>
                </Modal.Footer>
            </Modal>
            ) : <></>} */}

            <Modal show={showTablesModal} onHide={handleTablesModalHide}>
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
                    <Button variant="secondary" onClick={handleTablesModalHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleTablesModalClose}>
                        Get {attributes.type}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EntCard;