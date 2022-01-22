import React, { useEffect, createRef } from "react"
import GoogleMapReact from "google-map-react"
import { Paper, Typography, useMediaQuery } from "@material-ui/core"
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from "@material-ui/lab/Rating"

import useStyles from "./styles"

function Map(props) {
    const {
        coordinates,
        setBounds,
        setCoordinates,
        places,
        setMapMarkerClicked
    } = props
    const classes = useStyles()
    const isDesktop = useMediaQuery("(min-width:600px)")


    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key: "ADD_GOOGLE_CLOUD_API_KEY"}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                // options={}
                onChange={(e) => {
                    const {center, bounds} = e
                    setCoordinates({lat: center.lat, lng: center.lng})
                    setBounds({
                        ne: bounds.ne,
                        sw: bounds.sw
                    })
                }}
                onChildClick={(child) => {
                    setMapMarkerClicked(child)
                }}
            >
                {places?.map((place) => {
                    return (
                        <div
                            className={classes.markerContainer}
                            key={place.id}
                            lat={Number(place.latitude)}
                            lng={Number(place.longitude)}
                            text={place.name}
                        >
                            {
                                isDesktop ? (
                                    <Paper elevation={3} variant="outlined" className={classes.paper}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            {place.name}
                                        </Typography>
                                        <img
                                            className={classes.pointer}
                                            src={place.photo ? place.photo.images.large.url : "https://via.placeholder.com/500?text=No+Image+Available"}
                                            alt={place.name}
                                        />
                                        <Rating readOnly size="small" value={Number(place.rating)} />
                                    </Paper>
                                ) : (
                                    <LocationOnOutlinedIcon color="primary" fontSize="large" />
                                )
                            }
                        </div>
                    )
                })}
            </GoogleMapReact>
        </div>
    )
}

export default Map