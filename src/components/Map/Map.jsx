import React from "react"
import GoogleMapReact from "google-map-react"
import { Paper, Typography, useMediaQuery } from "@material-ui/core"
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from "@material-ui/lab"

import useStyles from "./styles"

function Map({ coordinates, setBounds, setCoordinates }) {
    const classes = useStyles()
    const isMobile = useMediaQuery("(min-width:600px)")

    return (
        <div className={classes.mapContainer}>
            <div>MAPS</div>
            {/* <GoogleMapReact
                bootstrapURLKeys={{key: "ADD_GOOGLE_CLOUD_API_KEY"}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                // options={}
                // onChange={(e) => {
                    const {center, bounds} = e
                    setCoordinates({lat: center.lat, lng: center.lng})
                    setBounds({
                        ne: bounds.ne,
                        sw: bounds.sw
                    })
                }}
                // onChildClick={}
            >

            </GoogleMapReact> */}
        </div>
    )
}

export default Map