package co.edu.poli.proyecto.model;

public class TecnicoMecanica {
    private String direccion;
    private String fecha;
    private String encargado;
    private String proxRevision;
    private String estado;
    private String observaciones;


    public TecnicoMecanica(String direccion, String fecha, String encargado, String proxRevision, String estado, String observaciones) {
        this.direccion = direccion;
        this.fecha = fecha;
        this.encargado = encargado;
        this.proxRevision = proxRevision;
        this.estado = estado;
        this.observaciones = observaciones;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getEncargado() {
        return encargado;
    }

    public void setEncargado(String encargado) {
        this.encargado = encargado;
    }

    public String getProxRevision() {
        return proxRevision;
    }

    public void setProxRevision(String proxRevision) {
        this.proxRevision = proxRevision;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}
