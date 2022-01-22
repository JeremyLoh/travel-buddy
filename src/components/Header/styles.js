import { alpha, makeStyles } from "@material-ui/core/styles"

export default makeStyles((theme) => ({
    title: {
        color: theme.palette.primary.contrastText,
        height: "100%",
        alignItems: "center",
        marginLeft: theme.spacing(2),
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(2),
    },
    search: {
        display: "flex",
        alignItems: "center",
        backgroundColor: alpha(theme.palette.common.white, 0.2),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.3),
        },
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
            paddingLeft: theme.spacing(1),
        },
    },
    searchInput: {
        color: "inherit",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(3),
    },
}))