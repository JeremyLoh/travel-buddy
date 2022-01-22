import { makeStyles } from "@material-ui/core/styles"

export default makeStyles((theme) => ({
    chip: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.contrastText,
    },
    img: {
        height: 300,
    }
}))