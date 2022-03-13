import {useState, useCallback, useRef} from 'react'
import {GoogleMap, Marker, Polyline} from "@react-google-maps/api"
import mapStyle from "../mapStyle"

const Map = ({question}) => {
    const [center, setCenter] = useState({lat: 0, lng: 0});
    const [markers, setMarkers] = useState([]);
    const [button, setButton] = useState(0);

    // sets the size of the maps
    const mapContainerStyle = {
        width: "95vw",
        height: "90vh"
      };
    
    // loads in options to the map including the mapStyle which is how the map looks and sets allowed controls
    const options = {
        styles: mapStyle,
        disableDefaultUI: true,
        zoomControl: true,
      };

    // this function calculates the distance between two locations with lat and lng values
    const haversine_distance = (mk1, mk2) => {
        var R = 3958.8; // Radius of the Earth in miles
        var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
        var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)
        
        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return d;
        };

    // style options for Polyline generated when user checks answer
    const lineOptions = {
        strokeColor: '#6a0dad',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#6a0dad',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        zIndex: 1
    }; 
      
    const handleMarkerClick = useCallback((event) => {
        setMarkers(() => [{
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            //  replace time with id for key
            time: new Date()
        }])
    }, []);

    // adds question marker to marker state and switches check button to next button
    const handleCheckClick = () => {
        setMarkers(current => [...current, question.coords])
        setButton(1)
      };
  
      // resets state of game to default settings and will set next question
      const handleNextClick = () => {
        setCenter({lat: 0, lng: 0})
        mapRef.current.setZoom(2)
        setButton(0)
        setMarkers([])
        // add in a setQuestion(newQuestion) function here once we have selection of questions from db
      };

    // sets the map in reference state so we can use the reference to pan around with the panTo function
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
      mapRef.current = map;
    }, []);

    // pans using lat and ln of latest marker drop
    const panTo = useCallback(({lat,lng}) => {
        mapRef.current.panTo({lat,lng})
      }, []);

    // makes sure only to pan when choosing answer marker position
    if (markers.length === 1) panTo(markers[0]);

    return(
        <>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={2} center={center} options={options} onClick={markers.length !== 2 ? handleMarkerClick : null} onLoad={onMapLoad}>
                {markers.map(marker => <Marker key={marker._id} position={{lat: marker.lat, lng: marker.lng}} />)}
                {markers.length === 2 ? <Polyline path={[markers[0], markers[1]]} options={lineOptions} /> : null}
            </GoogleMap>
            {button === 0 ? <button className='question-button' onClick={markers.length !== 0 ? handleCheckClick : null}>Check</button> : <button className='question-button' onClick={handleNextClick}>Next</button>}
            {markers.length === 2 ? <h2>{haversine_distance(markers[0], markers[1]).toFixed(2)}mi / {(haversine_distance(markers[0], markers[1])*1.60934).toFixed(2)}km</h2>  : null}
        </>
    );
};

export default Map;