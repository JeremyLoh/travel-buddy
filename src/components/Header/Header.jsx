import React, { useState } from "react"
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import { Autocomplete } from "@react-google-maps/api"

import useStyles from "./styles"

function Header({ setCoordinates }) {
    const classes = useStyles()
    const [autocomplete, setAutocomplete] = useState(null)

    function onLoad(autocompleteInstance) {
        setAutocomplete(autocompleteInstance)
    }

    function onPlaceChanged() {
        // Find lat, lng of new location
        if (autocomplete == null) {
            return
        }
        // Autocomplete getPlace() returns a PlaceResult
        // https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult
        const lat = autocomplete.getPlace().geometry.location.lat()
        const lng = autocomplete.getPlace().geometry.location.lng()
        setCoordinates({lat, lng})
    }

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h4" className={classes.title}>
                    Travel Buddy
                </Typography>
                <Box display="flex" alignItems="center">
                    <Typography variant="caption">
                        Because I am the size of what I see. And not the size of my own stature.
                    </Typography>
                    <Autocomplete
                        onLoad={onLoad}
                        onPlaceChanged={onPlaceChanged}
                    >
                        <div className={classes.search}>
                            <SearchIcon />
                            <InputBase
                                fullWidth={true}
                                placeholder="Search..."
                                className={classes.searchInput}
                            />
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header