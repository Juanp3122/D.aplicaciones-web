package co.edu.poli.proyecto.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document
public class Propietario {
    @Id
    private String cedula;
    private String nombre;
    private String apellido;
    private List<Vehiculo> vehiculos;


    public Propietario(String cedula, String nombre, String apellido, List<Vehiculo> vehiculos) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.vehiculos = vehiculos;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public List<Vehiculo> getVehiculos() {
        return vehiculos;
    }

    public void setVehiculos(List<Vehiculo> vehiculos) {
        this.vehiculos = vehiculos;
    }
}
