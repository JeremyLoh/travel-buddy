import React, { useEffect, useState } from "react"
import { CssBaseline, Grid } from "@material-ui/core"
import Header from "./components/Header/Header"
import List from "./components/List/List"
import Map from "./components/Map/Map"
import { getPlaces } from "./api"

export const PlaceContext = React.createContext()

function isEmpty(obj) {
    return Object.keys(obj).length === 0
}

function App() {
    const [places, setPlaces] = useState([])
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [mapMarkerClicked, setMapMarkerClicked] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState("restaurants")
    const [rating, setRating] = useState("")

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude})
        })
    }, [])

    useEffect(() => {
        const filteredPlaces = places?.filter((place) => Number(place.rating) >= rating)
        setFilteredPlaces(filteredPlaces || [])
    }, [rating])

    useEffect(() => {
        if (isEmpty(coordinates) || isEmpty(bounds)) {
          return
        }
        setIsLoading(true)

        getPlaces(type, bounds.sw, bounds.ne)
         .then((data) => {
                setPlaces(data)
                setFilteredPlaces([])
                setIsLoading(false)
            })
    }, [bounds, type])

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container>
                <Grid item xs={12} md={4}>
                    <PlaceContext.Provider value={{
                        type,
                        setType,
                        rating,
                        setRating,
                    }}>
                        <List
                          places={filteredPlaces.length ? filteredPlaces : places}
                          mapMarkerClicked={mapMarkerClicked}
                          isLoading={isLoading}
                        />
                    </PlaceContext.Provider>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setMapMarkerClicked={setMapMarkerClicked}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App