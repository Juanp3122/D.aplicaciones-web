import { useEffect, React, useState } from "react";
import { propietarioService } from "../services/propietarioService";
import { emailService } from "../services/emailService";
import Grid from '@material-ui/core/Grid';
import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@material-ui/core";
import NavBar from "./NavBar"
import { Label, Refresh } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
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
let arreglo = []
let refresh = true
export default function ListaPropietarios() {
    const classes = useStyles();
    const [list, setList] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [fullWidth] = useState(true);
    const [prueba, setPrueba] = useState([])
    let response = []
    const propietarioservice = new propietarioService();
    const emailservice = new emailService();
    async function loadPropietario() {

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

    
    const deletePropietario = (props) => {
        propietarioservice.deletePropietario(props)
        window.location.reload();
        console.log(props)
    }

    const sendEmail = (props) => {
        let body=JSON.stringify({
            
                mailTo:props,
                mailSubject: "Test react",
                mailContent: "Test react"
            
        })
        propietarioservice.sendEmail(body)
        console.log(body)
    }
        
    function DetalleVehiculos(props) {
        //console.log(props.vehiculo.vehiculos)

        //console.log(prueba)

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

    function BasicTable() {


        return (
            <Grid container lg={11} style={{ border: "1px solid black", margin: "75px" }}>
                <Grid container lg={12} >

                    <Grid item lg={3}>
                        <Typography className={classes.title}>Cédula</Typography>
                    </Grid>
                    <Grid item lg={3}>
                        <Typography className={classes.title}>Nombre</Typography>
                    </Grid>
                    <Grid item lg={2}>
                        <Typography className={classes.title}>Apellido</Typography>
                    </Grid>
                    <Grid item lg={3}>
                        <Typography style={{
                            alignContent:"left", fontSize: "30px",
                            margin: "10px",
                            fontWeight: "bold"
                        }}>E-Mail</Typography>
                    </Grid>

                    {list.map((item, index) => (
                        <Grid item lg={12}>
                            <Grid container>
                                <Grid item lg={3}>
                                    <Typography className={classes.data}>
                                        {item.cedula}
                                    </Typography>
                                </Grid>
                                <Grid item lg={3}>
                                    <Typography className={classes.data}>
                                        {item.nombre}
                                    </Typography>
                                </Grid>
                                <Grid item lg={2}>
                                    <Typography className={classes.data}>
                                        {item.apellido}
                                    </Typography>
                                </Grid>
                                <Grid item lg={2}>
                                    <Typography className={classes.data}>
                                        {item.email}
                                    </Typography>
                                </Grid>
                                <Grid item lg={2} style={{ display: "inline-flex" }}>
                            
                                    <IconButton  href={ `/propietario/${item.cedula}`}  key={item} aria-label="delete">
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deletePropietario(item.cedula)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton onClick={() => sendEmail(item.email)} aria-label="delete">
                                        <MailIcon />
                                    </IconButton>
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
            <BasicTable></BasicTable>
        </>
    )

}