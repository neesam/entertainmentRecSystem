import { useState, useEffect } from 'react';
import { Modal, Button, Form, Nav, Tab, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


const CustomModal = ({ showModal, handleModalHide, handleModalClose, attributes, selectedOption, handleOptionChange }) => {

    const [allModalAlbums, setAllModalAlbums] = useState([])
    const [allModalFilms, setAllModalFilms] = useState([])
    const [allModalShows, setAllModalShows] = useState([])
    const [allModalBooks, setAllModalBooks] = useState([])

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // getModalAlbums();
    }, [])


    const getModalAlbums = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5001/api/music_metadata_all`)
    
            if (!response.ok) {
                throw new Error(`Failed to fetch details for music_metadata`);
            }
        
            const data = await response.json()
            
            setAllModalAlbums(data)
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }
    
    const getModalFilms = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5001/api/film_metadata_all`)
    
            if (!response.ok) {
                throw new Error(`Failed to fetch details for film_metadata`);
            }
        
            const data = await response.json()
            
            setAllModalFilms(data)
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    const getModalShows = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5001/api/show_metadata_all`)
    
            if (!response.ok) {
                throw new Error(`Failed to fetch details for show_metadata`);
            }
        
            const data = await response.json()
            
            setAllModalShows(data)
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    const getModalBooks = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5001/api/book_metadata_all`)
    
            if (!response.ok) {
                throw new Error(`Failed to fetch details for book_metadata`);
            }
        
            const data = await response.json()
            
            setAllModalBooks(data)
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleTabSelect = (key) => {
        switch (key) {
            case 'tab1':
                getModalAlbums();
                break;
            case 'tab2':
                getModalFilms();
                break;
            case 'tab3':
                getModalShows();
                break;
            case 'tab4':
                getModalBooks();
                break;
            default:
                break;
        }
    };

    return (
    <Modal className={'full-size-modal'} show={showModal} onHide={handleModalHide} size="lg" centered>
        <Modal.Header closeButton>
            <Modal.Title>Finished content</Modal.Title>
        </Modal.Header> 
    <Modal.Body>
        <Tab.Container id="left-tabs-example" defaultActiveKey="tab1" onSelect={handleTabSelect}>
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="tab1">Albums</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tab2">Films</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tab3">Shows</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tab4">Books</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="tab1">
                        <Row>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (allModalAlbums.map((album, index) => (
                            <Col key={index} sm={12} md={6} lg={4}>
                                <Card style={{ width: '18rem' }}>
                                    <a
                                        target='_blank' 
                                        href={album.album_url} rel="noreferrer">
                                        <Card.Img variant="top" src={album.image_url}/>
                                    </a>
                                    <Card.Body>
                                        <Card.Title className="mb-2">
                                            <a 
                                                target='_blank' 
                                                href={album.album_url} 
                                                style={{textDecoration: 'none', color: 'black'}} rel="noreferrer">
                                                {album.album_name}
                                            </a>
                                        </Card.Title>
                                        <Card.Subtitle className="text-muted mb-2">
                                            <a 
                                                target='_blank' 
                                                href={album.artist_url}
                                                style={{textDecoration: 'none', color: 'black'}} rel="noreferrer">
                                                {album.artist_name}
                                            </a></Card.Subtitle>
                                        <Card.Subtitle className="text-muted mb-3 album-release-date">{album.release_date}</Card.Subtitle>
                                        <div className='mb-1'>
                                            {album.artist_genres.join(', ')}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )))}
                        </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="tab2">
            <Row>
            {loading ? (
                    <p>Loading...</p>
                ) : (allModalFilms.map((film, index) => (
                    <Col key={index} sm={12} md={6} lg={4}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={film.poster_path}/>
                            <Card.Body>
                                <Card.Title className="mb-2">
                                    {film.title}
                                </Card.Title>
                                <Card.Subtitle className="text-muted mb-2">{film.release_date}</Card.Subtitle>
                                {/* <Card.Subtitle className="text-muted mb-3 album-release-date">{album.release_date}</Card.Subtitle> */}
                                {/* {album.artist_genres.map((genre, index) => (
                                    <Card.Subtitle className='mb-3'>{genre}</Card.Subtitle>
                                ))} */}
                                <div className='mb-2'>
                                    {film.genres.join(', ')}
                                </div>
                                <Button variant="primary">Get recommendations</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )))}
                </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="tab3">
            <Row>
            {loading ? (
                    <p>Loading...</p>
                ) : (allModalShows.map((show, index) => (
                    <Col key={index} sm={12} md={6} lg={4}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={show.poster_url}/>
                            <Card.Body>
                                <Card.Title className="mb-2">
                                        {show.title}
                                </Card.Title>
                                <Card.Subtitle className="text-muted mb-3">First air date: {show.first_air_date}</Card.Subtitle>
                                <div className='mb-2'>
                                    {show.genres.join(', ')}
                                </div>
                                <Button variant="primary">Get recommendations</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )))}
                </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="tab4">
            <Row>
            {loading ? (
                    <p>Loading...</p>
                ) : (allModalBooks.map((book, index) => (
                    <Col key={index} sm={12} md={6} lg={4}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={book.description}/>
                            <Card.Body>
                                <Card.Title className="mb-2">
                                    {book.title}
                                </Card.Title>
                                <Card.Subtitle className="text-muted mb-2">{book.subtitle}</Card.Subtitle>
                                <div className='mb-2'>
                                    <Card.Subtitle className="mb-2">{book.authors.join(', ')}</Card.Subtitle>
                                </div>
                                <div className='mb-2'>
                                    {book.genres.join(', ')}
                                </div>
                                <Button variant="primary">Get recommendations</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )))}
                </Row>
            </Tab.Pane>
            </Tab.Content>
        </Col>
        </Row>
        </Tab.Container>
    </Modal.Body>
    </Modal>
    );
};

export default CustomModal