import {useEffect} from 'react'
import React, {useState} from "react";
import { Modal, Button, Form, Nav, Tab, Row, Col } from 'react-bootstrap';


const AddToTableModal = ({showModal, handleModalClos}) => {

    const [selectedOption, setSelectedOption] = useState(null)
    const [writtenEntry, setWrittenEntry] = useState(null)
    
    const tables = [
        'album_allgenres',
        'album_bedroomAOR',
        'album_brokentransmission',
        'artist_classicalComposer',
        'album_createdbyrejection',
        'album_emo',
        'album_emoautumn',
        'album_greatscene',
        'album_guysfavemoalbums',
        'album_hopelessrecords',
        'album_inCirculation',
        'album_indiepop',
        'album_magicsheet',
        'album_moenieandkitchie',
        'album_popalbums',
        'album_risecore',
        'album_rymrecs',
        'album_soundsofspotify',
        'album_tolisten',
        'album_vaporwave',
        'album_vinyls',
        'album_waterloggedEars',
        'book_toread',
        'film_ebert',
        'film_imdb250',
        'filmrecs',
        'film_towatch',
        'film_visualhypnagogia',
        'film_rymtop1500',
        'film_criterion',
        'shows',
        'anime_classic',
        'anime_other'
    ]

    const handleOptionChange = (event) => setSelectedOption(event.target.value);

    const handleWrittenEntryChange = (event) => setWrittenEntry(event.target.value);

    const addToTable = async () => {
        if(selectedOption) {
            if(selectedOption.includes('album') || selectedOption.includes('artist')) {
                try {
                    const response = await fetch(`http://localhost:5001/api/add_to_music_table/${selectedOption}/${writtenEntry}`, {
                        method: 'POST',
                        headers: { 'Content-type': 'application/json' },
                    });

                    console.log(response)
            
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Delete failed: ${errorData.message || 'Unknown error'}`);
                    }
        
                    console.log(await response.json());
                    console.log('Added successfully.');
                    
                } catch (error) {
                    console.error('Error during addition:', error.message);
                }
            } else if(selectedOption.includes('film')) {
                try {
                    const response = await fetch(`http://localhost:5001/api/add_to_film_table/${selectedOption}/${writtenEntry}`, {
                        method: 'POST',
                        headers: { 'Content-type': 'application/json' },
                    });
            
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Delete failed: ${errorData.message || 'Unknown error'}`);
                    }
        
                    console.log(await response.json());
                    console.log('Added successfully.');
                    
                } catch (error) {
                    console.error('Error during addition:', error.message);
                }
            } else if(selectedOption.includes('anime') || selectedOption === 'shows') {
                try {
                    const response = await fetch(`http://localhost:5001/api/add_to_show_table/${selectedOption}/${writtenEntry}`, {
                        method: 'POST',
                        headers: { 'Content-type': 'application/json' },
                    });
            
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Delete failed: ${errorData.message || 'Unknown error'}`);
                    }
        
                    console.log(await response.json());
                    console.log('Added successfully.');
                    
                } catch (error) {
                    console.error('Error during addition:', error.message);
                }
            } else {
                try {
                    const response = await fetch(`http://localhost:5001/api/add_to_book_table/${selectedOption}/${writtenEntry}`, {
                        method: 'POST',
                        headers: { 'Content-type': 'application/json' },
                    });
            
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Delete failed: ${errorData.message || 'Unknown error'}`);
                    }
        
                    console.log(await response.json());
                    console.log('Added successfully.');
                    
                } catch (error) {
                    console.error('Error during addition:', error.message);
                }
            }
        }
        setSelectedOption(null)
        setWrittenEntry(null)
        handleModalClos(false)
    }


    return (
        <Modal show={showModal} onHide={handleModalClos}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add entry to table
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form className='mb-3'>
                        <Form.Group controlId="formDropdown">
                            <Form.Label>Choose a table</Form.Label>
                            <Form.Control as="select" value={selectedOption} onChange={handleOptionChange}>
                                <option value="">-- Select an option --</option>
                                {tables.map((table, index) => (
                                    <option key={index} value={table}>
                                        {table}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                </Form>
                {selectedOption ? (
                    <Form>
                        <Form.Group controlId="formDropdown">
                            <Form.Label>Create an entry</Form.Label>
                            <Form.Control type="text" placeholder="" value={writtenEntry} onChange={handleWrittenEntryChange}/>
                        </Form.Group>
                    </Form>
                ) : <></>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={addToTable}>
                        Add to {selectedOption}
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}

export default AddToTableModal