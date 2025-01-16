// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import React, {useState} from "react";
// import renderChart from "./Chart";
// // import GetAttributesForRYMAlbum from "../FetchingFunctionality/Attributes";

// const MyForm = () => {

//     const { albumTracks, albumTrackAttributes, chartData, RYMPlaylistAlbumID } = GetAttributesForRYMAlbum();

//     const [randomAlbumTracks, setRandomAlbumTracks] = useState([])
//     const [randomAlbumTrackAttributes, setRandomAlbumTrackAttributes] = useState([])
//     const [randomAlbumChartData, setRandomAlbumChartData] = useState([])
//     const [randomRYMPlaylistAlbumID, setRandomRYMPlaylistAlbumID] = useState('')
//     const [selectedAttribute, setSelectedAttribute] = useState('');

//     const handleAttributeChange = (event) => {
//         setSelectedAttribute(event.target.value);
//     };

//     const handleButtonClick = () => {
//         setRandomAlbumTracks(albumTracks)
//         setRandomAlbumTrackAttributes(albumTrackAttributes)
//         setRandomAlbumChartData(chartData)
//         setRandomRYMPlaylistAlbumID(RYMPlaylistAlbumID)


//         renderChart(randomAlbumTracks, randomAlbumChartData)
//     }
//     return (
//         <Form style={{padding: '6%'}}>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//                 <Form.Label>Choose an attribute</Form.Label>
//                 <Form.Select aria-label="Default select example" onChange={handleAttributeChange}>
//                     <option>-</option>
//                     <option value="acousticness">Acousticness</option>
//                     <option value="danceability">Danceability</option>
//                     <option value="instrumentalness">Instrumentalness</option>
//                     <option value="key">Key</option>
//                     <option value="liveness">Liveness</option>
//                     <option value="loudness">Loudness</option>
//                     <option value="mode">Mode</option>
//                     <option value="speechiness">Speechiness</option>
//                     <option value="tempo">Tempo</option>
//                     <option value="time_signature">Time Signature</option>
//                     <option value="valence">Valence</option>
//                 </Form.Select>
//             </Form.Group>
//             <Button onClick={handleButtonClick}>
//                 Submit
//             </Button>
//         </Form>
//     )
// }

// export default MyForm;