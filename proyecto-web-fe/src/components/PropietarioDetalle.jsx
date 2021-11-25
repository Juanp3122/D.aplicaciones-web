import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { propietarioService } from "../services/propietarioService";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { IconButton } from '@material-ui/core';
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import DialogActions from '@material-ui/core/DialogActions';

import DialogContentText from '@material-ui/core/DialogContentText';

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
    data2:{
        margin: "10px",
        fontSize: "20px",
        fontWeight:"bold"
    },
    data3:{
        marginLeft: "10px",
        fontSize: "20px",
        fontWeight:"300"
    }



}));
let parametro = ""
export default function PropietarioDetalle() {

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

    function AlertDialog(props) {
        const [open, setOpen] = useState(false);
        console.log(props.vehiculo)
        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        return (
            <div>
                
                <IconButton onClick={handleClickOpen} aria-label="delete">
                    <VisibilityIcon />
                </IconButton>
                <Dialog
                    open={open}
                    onClose={handleClose}
                
                    fullWidth={true}
                >
                    
                    <DialogTitle className={classes.title} >
                    <Typography className={classes.title}>Información Tecnico Mecánica</Typography>
                    </DialogTitle>
                    <DialogContent>
                        
                            <Typography className={classes.data2} >
                                Lugar de revisión:
                            </Typography>
                            <Typography className={classes.data3}>
                            {props.vehiculo.tecnicoMecanica.direccion}
                            </Typography >
                            <Typography className={classes.data2}>
                                Fecha:
                            </Typography >
                            <Typography className={classes.data3}>
                            {props.vehiculo.tecnicoMecanica.fecha}
                            </Typography>
                            <Typography className={classes.data2}>
                                Encargado:
                            </Typography>
                            <Typography className={classes.data3}>
                            {props.vehiculo.tecnicoMecanica.encargado}
                            </Typography>
                            <Typography className={classes.data2}>
                                Próxima Revisión:
                            </Typography>
                            <Typography className={classes.data3}>
                            {props.vehiculo.tecnicoMecanica.proxRevision}
                            </Typography>
                            <Typography className={classes.data2}>
                                Estado:
                            </Typography>
                            <Typography className={classes.data3}>
                            {props.vehiculo.tecnicoMecanica.estado}
                            </Typography>
                            <Typography className={classes.data2}>
                                Observaciones:
                            </Typography>
                            <Typography className={classes.data3}>
                            {props.vehiculo.tecnicoMecanica.observaciones}
                            </Typography>
                           
                        
                    </DialogContent>
                    <DialogActions>
                        
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
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

                                    <AlertDialog vehiculo={item}></AlertDialog>
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