import React from "react"
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import { Autocomplete } from "@react-google-maps/api"

import useStyles from "./styles"

function Header() {
    const classes = useStyles()
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
                    {/* <Autocomplete> */}
                        <div className={classes.search}>
                            <SearchIcon />
                            <InputBase
                                fullWidth={true}
                                placeholder="Search..."
                                className={classes.searchInput}
                            />
                        </div>
                    {/* </Autocomplete> */}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header