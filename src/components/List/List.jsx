import React, { useState, createRef, useEffect } from "react"
import { 
    Grid,
    CircularProgress,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from "@material-ui/core"
import PlaceDetails from "../PlaceDetails/PlaceDetails"

import useStyles from "./styles"

function List({ places, mapMarkerClicked, isLoading }) {
    const classes = useStyles()
    const [type, setType] = useState("restaurants")
    const [rating, setRating] = useState("")
    const [placesRefs, setPlacesRefs] = useState([])
    
    useEffect(() => {
        const refs = Array(places?.length).fill()
            .map((_, index) => placesRefs[index] || createRef(places[index].id))
        setPlacesRefs(refs)
    }, [places])

    console.log("list mapMarkerClicked", { mapMarkerClicked })

    return (
        <div className={classes.container}>
            <Typography variant="h4">Nearby Restaurants, Hotels &amp; Attractions</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress color="secondary" size="4rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select value={type} onChange={(e) => setType(e.target.value)}>
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3.0</MenuItem>
                            <MenuItem value={4}>Above 4.0</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid
                        className={classes.list}
                        container
                        spacing={2}
                    >
                        {places?.map((place, index) => {
                            return (
                                <Grid item key={place.id} xs={12}>
                                    <PlaceDetails 
                                        place={place}
                                        placeRef={placesRefs[index]}
                                        isSelected={mapMarkerClicked === place.id} 
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                </>
            )}
        </div>
    )
}

export default List