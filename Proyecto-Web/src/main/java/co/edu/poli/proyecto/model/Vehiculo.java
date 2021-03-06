package co.edu.poli.proyecto.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


public class Vehiculo {

    private String placa;
    private String modelo;
    private String color;
    private String fechaRevision;
    private TecnicoMecanica tecnicoMecanica;


    public Vehiculo(String placa, String modelo, String color, String fechaRevision, TecnicoMecanica tecnicoMecanica) {
        this.placa = placa;
        this.modelo = modelo;
        this.color = color;
        this.fechaRevision = fechaRevision;
        this.tecnicoMecanica = tecnicoMecanica;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getFechaRevision() {
        return fechaRevision;
    }

    public void setFechaRevision(String fechaRevision) {
        this.fechaRevision = fechaRevision;
    }

    public TecnicoMecanica getTecnicoMecanica() {
        return tecnicoMecanica;
    }

    public void setTecnicoMecanica(TecnicoMecanica tecnicoMecanica) {
        this.tecnicoMecanica = tecnicoMecanica;
    }
}
