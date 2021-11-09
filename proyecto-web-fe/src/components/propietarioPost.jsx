import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { propietarioService } from "../services/propietarioService";
import NavBar from "./NavBar";
export default function PropietarioPost() {
    const propietarioVacio = {
        cedula: "",
        nombre: "",
        apellido: "",
        email:"",
        vehiculos: []
    }
    const [propietario,setpropietario] = useState(propietarioVacio)
    const propietarioservice = new propietarioService();
    
    const handleChange =(e)=>{
        const {name,value}=e.target;
        setpropietario((prevState)=>({
            ...prevState,
            [name]:value,
        }));
        
    }

    function button(propietario) {
        propietarioservice.postPropietario(propietario)
    }
    return (
        <>
            <center>
                <Grid container lg={12}>
                    <Grid item lg={12}>
                        <Typography>Añadir Propietario</Typography>
                    </Grid>
                    <Grid item lg={12}>
                        <TextField  onChange={handleChange} name="cedula" style={{ width: "500px", margin: "15px" }} size="Large" variant="outlined" label="Cédula"></TextField>
                    </Grid>
                    <Grid item lg={12}>
                        <TextField onChange={handleChange} name="nombre" style={{ width: "500px", margin: "15px" }} variant="outlined" label="Nombre"></TextField>
                    </Grid>
                    <Grid item lg={12}>
                        <TextField onChange={handleChange} name="apellido" style={{ width: "500px", margin: "15px" }} variant="outlined" label="Apellido"></TextField>
                    </Grid>
                    <Grid item lg={12}>
                        <TextField onChange={handleChange} name="email" style={{ width: "500px", margin: "15px" }} variant="outlined" label="E-mail"></TextField>
                    </Grid>
                    <Grid item lg={12}>
                        <Button  variant="contained" onClick={()=>button(propietario)}>Añadir</Button>
                    </Grid>
                </Grid>
            </center>
        </>
    )
}