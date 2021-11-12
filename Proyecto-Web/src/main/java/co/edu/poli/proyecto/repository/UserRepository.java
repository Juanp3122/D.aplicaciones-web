package co.edu.poli.proyecto.repository;

import co.edu.poli.proyecto.model.Propietario;
import co.edu.poli.proyecto.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByUserName(String userName);
}
