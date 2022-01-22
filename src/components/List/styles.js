import { makeStyles } from "@material-ui/core/styles"

export default makeStyles((theme) => ({
    formControl: {
        minWidth: 100,
        marginBottom: theme.spacing(3),
        margin: theme.spacing(2),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    loading: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "600px",
    },
    container: {
        padding: theme.spacing(3),
    },
    marginBottom: {
        marginBottom: theme.spacing(2),
    },
    list: {
        height: "80vh",
        overflow: "auto",
    }
}))