import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { propietarioService } from "../services/propietarioService";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { IconButton } from '@material-ui/core';
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: "30px",
        margin: "10px",
        fontWeight: "bold"
    },
    data: {
        margin: "10px",
        fontSize: "18px"

    },
    paper: {
        borderRadius: '10px',
        backgroundColor: '#fff'
    },


}));
let parametro = ""
export default function PropietarioDetalle() {
    const [openDialog, setOpenDialog] = useState(false)
    const classes = useStyles();
    const propietarioservice = new propietarioService();
    const [propietario, setPropietario] = useState([]);
    const [fullWidth] = useState(true);
    let { propietarioId } = useParams();
    console.log(propietarioId)
    async function loadPropietario() {

        try {
            const response = await propietarioservice.getPropietarioById(propietarioId);
            setPropietario(response)
            console.log(response)
        } catch (e) {
            console.log(e.message)
        }
    }
    useEffect(() => {
        loadPropietario();
    }, [])
    
    function DetalleVehiculos(props) {
        //setOpenDialog(true)
        //console.log(props.tecno.tecnicoMecanica)

        console.log(props.direccion)

        return (
            <Dialog
                open={props.open}
                fullWidth={fullWidth}
                onClose={props.onClose}
                aria-labelledby="max-width-dialog-title"
                classes={{ paper: classes.paper }}
            >
                <DialogTitle>
                    {/* {props.tecno.tecnicoMecanica.direccion} */}
                </DialogTitle>
                <DialogContent>



                </DialogContent>
            </Dialog>
        )
    }
    return (
        <div>
            <Grid container lg={11} style={{ border: "1px solid black", margin: "75px" }}>
                <Grid container lg={12} >

                    <Grid item lg={3}>
                        <Typography className={classes.title}>Placa</Typography>
                    </Grid>
                    <Grid item lg={3}>
                        <Typography className={classes.title}>Modelo</Typography>
                    </Grid>
                    <Grid item lg={2}>
                        <Typography className={classes.title}>Color</Typography>
                    </Grid>

                    {propietario.vehiculos && propietario.vehiculos.map((item) => (
                        <Grid item lg={12}>
                            <Grid container>
                                <Grid item lg={3}>
                                    <Typography className={classes.data}>
                                        {item.placa}
                                    </Typography>
                                </Grid>
                                <Grid item lg={3}>
                                    <Typography className={classes.data}>
                                        {item.modelo}
                                    </Typography>
                                </Grid>
                                <Grid item lg={2}>
                                    <Typography className={classes.data}>
                                        {item.color}
                                    </Typography>
                                </Grid>
                                <Grid item lg={2}>
                                    <IconButton onClick={() => DetalleVehiculos(item)} key={item} aria-label="delete">
                                        <VisibilityIcon />
                                    </IconButton>
                                    <DetalleVehiculos
                                        vehiculo={item} open={openDialog} onClose={() => setOpenDialog(false)} ></DetalleVehiculos>
                                </Grid>

                            </Grid>

                        </Grid>

                    ))}
                </Grid>

            </Grid>

            );




        </div>
    )

}