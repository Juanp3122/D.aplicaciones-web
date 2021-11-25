import { useEffect, React, useState } from "react";
import { propietarioService } from "../services/propietarioService";
import { emailService } from "../services/emailService";
import Grid from '@material-ui/core/Grid';
import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@material-ui/core";
import NavBar from "./NavBar"
import { Label, Refresh } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, TextField } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2';
import AddIcon from '@material-ui/icons/Add';
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
    data2: {
        margin: "10px",
        fontSize: "20px",
        fontWeight: "bold"
    },
    data3: {
        marginLeft: "10px",
        fontSize: "20px",
        fontWeight: "300"
    }


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
        let body = JSON.stringify({

            mailTo: props.email,
            mailSubject: "Recordatorio revisión",
            mailContent: `Señor@ ${props.nombre} ${props.apellido} la fecha de revisión tecnomecánica de uno de sus vehiculos está pronta a vencer` 

        })
        propietarioservice.sendEmail(body)
        console.log(body)
        Swal.fire({
            title: "Éxito",
            text: 'El correo fue enviado exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#4BB547',
            reverseButtons: true
        })
    }



    function AlertDialog(props) {
        const propietarioVacio = {
            cedula: "",
            nombre: "",
            apellido: "",
            email: "",
            vehiculos: []
        }
        const [open, setOpen] = useState(false);
        const [propietario, setpropietario] = useState(props.propietario)


        const handleClickOpen = () => {
            setOpen(true);
        };


        const handleChange = (e) => {
            const { name, value } = e.target;
            setpropietario((prevState) => ({
                ...prevState,
                [name]: value,
            }));

        }
        function button(propietario) {
            propietarioservice.putPropietario(propietario)
            setOpen(false);
            window.location.reload();
            console.log(propietario)
        }

        return (
            <div>

                <IconButton onClick={handleClickOpen} aria-label="delete">
                    <EditIcon />
                </IconButton>
                <Dialog
                    open={open}
                    onClose={button}

                    fullWidth={true}
                >

                    <DialogTitle className={classes.title} >
                        <Typography className={classes.title}>Editar propietario</Typography>
                    </DialogTitle>
                    <DialogContent>

                        <center>
                            <Grid container lg={12}>

                                <Grid item lg={12}>
                                    <TextField disabled value={props.propietario.cedula} onChange={handleChange} name="cedula" style={{ width: "500px", margin: "15px" }} size="Large" variant="outlined" label="Cédula"></TextField>
                                </Grid>
                                <Grid item lg={12}>
                                    <TextField defaultValue={props.propietario.nombre} onChange={handleChange} name="nombre" style={{ width: "500px", margin: "15px" }} variant="outlined" label="Nombre"></TextField>
                                </Grid>
                                <Grid item lg={12}>
                                    <TextField defaultValue={props.propietario.apellido} onChange={handleChange} name="apellido" style={{ width: "500px", margin: "15px" }} variant="outlined" label="Apellido"></TextField>
                                </Grid>
                                <Grid item lg={12}>
                                    <TextField defaultValue={props.propietario.email} onChange={handleChange} name="email" style={{ width: "500px", margin: "15px" }} variant="outlined" label="E-mail"></TextField>
                                </Grid>
                                <Grid item lg={12}>
                                    <Button onClick={() => button(propietario)} variant="contained" >Actualizar</Button>
                                </Grid>
                            </Grid>
                        </center>



                    </DialogContent>
                    <DialogActions>


                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    function AlertDialogCars(props) {
        const propietarioVacio = {
            cedula: "",
            nombre: "",
            apellido: "",
            email: "",
            vehiculos: []
        }
        const vehiculoVacio = {
            placa: "",
            modelo: "",
            color: "",
            tecnicoMecanica:{
                direccion:"",
                fecha:"",
                encargado:"",
                proxRevision:"",
                estado:"",
                obervaciones:""
            } 
            
        }
        const tecnicoMecanicaVacio={
            direccion:"",
                fecha:"",
                encargado:"",
                proxRevision:"",
                estado:"",
                obervaciones:""
        }
        
        const [open, setOpen] = useState(false);
        const [propietario, setpropietario] = useState(props.propietario)
        const [vehiculo,setVehiculo]= useState(vehiculoVacio)
        const [tecnicoMecanica,setTecnicoMecanica]= useState(tecnicoMecanicaVacio)
        

        const handleClickOpen = () => {
            setOpen(true);
        };


        const handleChange = (e) => {
            const { name, value } = e.target;
            setVehiculo((prevState) => ({
                ...prevState,
                [name]: value,
            }));
            console.log(vehiculo);
        }
        const handleChangeTecno = (e) => {
            const { name, value } = e.target;
            setTecnicoMecanica((prevState) => ({
                ...prevState,
                [name]: value,
            }));
            console.log(tecnicoMecanica);
        }
        function button() {
             let vehiculo2=vehiculo;
             vehiculo2.tecnicoMecanica=tecnicoMecanica;
             setVehiculo(vehiculo2);
             console.log(vehiculo)
            
            let propietario2=propietario
            propietario2.vehiculos.push(vehiculo)


            setpropietario(propietario2)
           

            
            
             propietarioservice.putPropietario(propietario)
             
             setOpen(false);
             Swal.fire({
                title: "Éxito",
                text: 'El Vehiculo fue añadido correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#4BB547',
                reverseButtons: true
            })
            
        }

        return (
            <div>

                <IconButton onClick={handleClickOpen} aria-label="delete">
                    <AddIcon />
                </IconButton>
                <Dialog
                    open={open}
                    onClose={button}

                    fullWidth={true}
                >

                    <DialogTitle className={classes.title} >
                        <Typography className={classes.title}>Añadir vehiculos</Typography>
                    </DialogTitle>
                    <DialogContent>

                        <center>
                            <Grid container lg={12}>

                                <Grid item lg={12}>
                                    <TextField   onChange={handleChange} name="placa" style={{ width: "500px", margin: "15px" }} size="Large" variant="outlined" label="Placa"></TextField>
                                </Grid>
                                <Grid item lg={12}>
                                    <TextField  onChange={handleChange} name="modelo" style={{ width: "500px", margin: "15px" }} variant="outlined" label="Modelo"></TextField>
                                </Grid>
                                <Grid item lg={12}>
                                    <TextField  onChange={handleChange} name="color" style={{ width: "500px", margin: "15px" }} variant="outlined" label="Color"></TextField>
                                </Grid>
                                <Typography>
                                    Tecno Mecánica 
                                </Typography>
                                <Grid item lg={12}>
                                    <TextField  onChange={handleChangeTecno} name="direccion" style={{ width: "500px", margin: "15px" }} variant="outlined" label="Dirección"></TextField>
                                </Grid>
                                <Grid item lg={12}>
                                    <TextField  onChange={handleChangeTecno} name="fecha" style={{ width: "500px", margin: "15px" }} variant="outlined" label="Fecha"></TextField>
                                </Grid>
                                <Grid item lg={12}>
                                    <TextField  onChange={handleChangeTecno} name="encargado" style={{ width: "500px", margin: "15px" }} variant="outlined" label="Encargado"></TextField>
                                </Grid>
                                <Grid item lg={12}>
                                    <TextField  onChange={handleChangeTecno} name="proxRevision" style={{ width: "500px", margin: "15px" }} variant="outlined" label="Próxima Revisión"></TextField>
                                </Grid>
                                <Grid item lg={12}>
                                    <TextField  onChange={handleChangeTecno} name="estado" style={{ width: "500px", margin: "15px" }} variant="outlined" label="Estado"></TextField>
                                </Grid>
                                <Grid item lg={12}>
                                    <TextField  onChange={handleChangeTecno} name="observaciones" style={{ width: "500px", margin: "15px" }} variant="outlined" label="Observaciones"></TextField>
                                </Grid>
            
                                <Grid item lg={12}>
                                    <Button onClick={() => button()} variant="contained" >Añadir Vehiculo</Button>
                                </Grid>
                            </Grid>
                        </center>



                    </DialogContent>
                    <DialogActions>


                    </DialogActions>
                </Dialog>
            </div>
        );
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
                            alignContent: "left", fontSize: "30px",
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

                                    <IconButton href={`/propietario/${item.cedula}`} key={item} aria-label="delete">
                                        <DirectionsCarIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deletePropietario(item.cedula)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                    <AlertDialog propietario={item}></AlertDialog>
                                    <IconButton onClick={() => sendEmail(item)} aria-label="delete">
                                        <MailIcon />
                                    </IconButton>
                                    <AlertDialogCars propietario={item}></AlertDialogCars>
                                </Grid>

                            </Grid>

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