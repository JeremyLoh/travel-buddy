import React from "react"
import { nanoid } from "nanoid"
import {
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardActions,
    CardContent,
    Chip
} from "@material-ui/core"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import PhoneIcon from "@material-ui/icons/Phone"
import Rating from "@material-ui/lab/Rating"

import useStyles from "./styles"

function PlaceDetails({ place, placeRef, isSelected }) {
    const classes = useStyles()
    console.log("isSelected", isSelected)

    if (isSelected) {
        placeRef?.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    return (
        <Card elevation={5}>
            <CardMedia
                className={classes.img}
                image={place.photo ? place.photo.images.large.url : "https://via.placeholder.com/500?text=No+Image+Available"}
                title={place.name} 
            />
            <CardContent>
                <Typography variant="h5" gutterBottom>{place.name}</Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Rating readOnly size="small" value={Number(place.rating)} />
                    <Typography gutterBottom variant="subtitle1">
                        out of {place.num_reviews} Reviews
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="baseline">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
                </Box>
                {place?.awards?.map((award) => {
                    return (
                        <Box 
                            my={1}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            key={nanoid()}
                        >
                            <img src={award.images.small} alt={award.display_name} />
                            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                        </Box>
                    )
                })}
                {place?.cuisine?.map(({ name }) => {
                    return (
                        <Chip
                            key={name}
                            size="small"
                            label={name}
                            className={classes.chip}
                        />
                    )
                })}
                {place?.address && (
                    <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
                        <LocationOnIcon /> 
                        <Typography variant="subtitle2">
                            {place.address}
                        </Typography>
                    </Box>
                )}
                {place?.phone && (
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <PhoneIcon />
                        <Typography variant="subtitle2">{place.phone}</Typography>
                    </Box>
                )}
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => window.open(place.web_url, "_blank")}
                    >
                        Trip Advisor
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => window.open(place.website, "_blank")}
                    >
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default PlaceDetails