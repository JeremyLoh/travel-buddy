import { makeStyles } from "@material-ui/core/styles"

export default makeStyles((theme) => ({
    chip: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.contrastText,
        margin: theme.spacing(1, 1, 1, 0),
    },
    img: {
        height: 300,
    }
}))