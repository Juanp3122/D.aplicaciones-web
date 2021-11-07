import { useEffect, React, useState } from "react";
import { propietarioService } from "../services/propietarioService";
import Grid from '@material-ui/core/Grid';
import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@material-ui/core";
import NavBar from "./NavBar"
import { Label } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: "30px",
        margin: "10px",
        fontWeight: "bold"
    },
    data: {
        margin: "10px",
        fontSize: "22px"

    },
    paper: {
        borderRadius: '10px',
        backgroundColor: '#fff'
    },


}));
let parametro = ""
let arreglo = []
export default function ListaPropietarios() {
    const classes = useStyles();
    const [list, setList] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [fullWidth] = useState(true);
    const [prueba, setPrueba] = useState([])
    let response = []
    async function loadPropietario() {
        const propietarioservice = new propietarioService();
        try {
            response = await propietarioservice.getAllPropietarios();
            setList(response)
            console.log(list)

        } catch (err) {
            console.log(err)
        }

    }



    useEffect(() => {
        loadPropietario();
    }, [])

    const Dialogo = (props) => {
        parametro = props
        // resultado=parametro
        //console.log(parametro)
        //DetalleVehiculos(parametro)
        setOpenDialog(true)



    }
    function DetalleVehiculos(props) {
        //console.log(props.vehiculo.vehiculos)
        setPrueba(props.vehiculo.vehiculos)
        //console.log(prueba)
        prueba.map((item) => {
            console.log(item)
        })
        return (
            <Dialog
                open={props.open}
                fullWidth={fullWidth}
                onClose={props.onClose}
                aria-labelledby="max-width-dialog-title"
                classes={{ paper: classes.paper }}
            >
                <DialogTitle>
                    Vehiculos
                </DialogTitle>
                <DialogContent>



                </DialogContent>
            </Dialog>
        )
    }
    // <Dialog
    //     fullWidth={fullWidth}
    //     maxWidth={maxWidth}
    //     open={openPreAd}
    //     onClose={() => setOpenPreAd(false)}
    //     aria-labelledby="max-width-dialog-title"
    //     classes={{ paper: classes.paper }}
    // >
    //     <DialogTitle onClose={() => setOpenPreAd(false)} id="max-width-dialog-title">
    //         <IconButton aria-label="close" className={classes.closeButton} onClick={() => setOpenPreAd(false)}>
    //             <CloseIcon />
    //         </IconButton>
    //     </DialogTitle>
    //     <DialogContent>
    //         <PreAdvisory />
    //     </DialogContent>
    // </Dialog>
    function BasicTable() {


        return (
            <Grid container lg={11} style={{ border: "1px solid black", margin: "75px" }}>
                <Grid container lg={12} >

                    <Grid item lg={4}>
                        <Typography className={classes.title}>Cédula</Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Typography className={classes.title}>Nombre</Typography>
                    </Grid>
                    <Grid item lg={3}>
                        <Typography className={classes.title}>Apellido</Typography>
                    </Grid>

                    {list.map((item, index) => (
                        <Grid item lg={12}>
                            <Grid container>
                                <Grid item lg={4}>
                                    <Typography className={classes.data}>
                                        {item.cedula}
                                    </Typography>
                                </Grid>
                                <Grid item lg={4}>
                                    <Typography className={classes.data}>
                                        {item.nombre}
                                    </Typography>
                                </Grid>
                                <Grid item lg={3}>
                                    <Typography className={classes.data}>
                                        {item.apellido}
                                    </Typography>
                                </Grid>
                                <Grid item lg={1}>
                                    <Button onClick={() => Dialogo(item)} key={item}>Ver vehiculos</Button>
                                </Grid>
                            </Grid>
                            <DetalleVehiculos
                                vehiculo={parametro} open={openDialog} onClose={() => setOpenDialog(false)} ></DetalleVehiculos>
                        </Grid>

                    ))}
                </Grid>

            </Grid>

        );
    }
    return (
        <>
            <NavBar></NavBar>
            <BasicTable></BasicTable>

        </>
    )

}