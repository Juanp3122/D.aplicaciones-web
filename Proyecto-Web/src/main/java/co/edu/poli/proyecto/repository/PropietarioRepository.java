package co.edu.poli.proyecto.repository;

import co.edu.poli.proyecto.model.Propietario;
import co.edu.poli.proyecto.model.Vehiculo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropietarioRepository extends MongoRepository<Propietario, String> {
}
