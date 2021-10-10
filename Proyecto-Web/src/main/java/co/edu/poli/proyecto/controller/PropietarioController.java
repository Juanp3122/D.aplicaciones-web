package co.edu.poli.proyecto.controller;

import co.edu.poli.proyecto.model.Propietario;
import co.edu.poli.proyecto.repository.PropietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController // Defines that this class is a spring bean
@RequestMapping("/propietarios/")
public class PropietarioController {

    @Autowired
    PropietarioRepository propietarioRepository;


    @GetMapping("/")
    public List<Propietario> getAllPropietarios(){
        return propietarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Propietario getPropietarioByID(@PathVariable String id) {
        return propietarioRepository.findById(id).get();
    }

    @PostMapping("/post")
    public Propietario savePropietario(@RequestBody Propietario propietario){
        return propietarioRepository.save(propietario);
    }

    @PostMapping("/PropietariosList")
    public List<Propietario> saveListPropietario(@RequestBody List<Propietario> propietarios) {
        return propietarioRepository.saveAll(propietarios);
    }

    @PutMapping("/")
    public Propietario updatePropietario(@RequestBody Propietario propietario){
        return propietarioRepository.save(propietario);
    }
    @DeleteMapping("/{id}")
    public Propietario deletePropietarioById(@PathVariable String id) {
        Propietario propietario = propietarioRepository.findById(id).get();
        propietarioRepository.deleteById(id);
        return propietario;
    }
}
