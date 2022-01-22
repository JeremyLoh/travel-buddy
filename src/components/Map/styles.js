import { makeStyles } from "@material-ui/core/styles"

export default makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100px",
        padding: "10px",
    },
    mapContainer: {
        height: "80vh",
        width: "100%",
    },
    pointer: {
        cursor: "pointer",
    },
    markerContainer: {
        position: "absolute",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
        "&:hover": {
            zIndex: 2
        },
    },
}))