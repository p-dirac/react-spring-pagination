package backend.dao;

//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import backend.model.EmployeeEntity;

@Repository
public interface EmployeeRepository extends PagingAndSortingRepository<EmployeeEntity, Long>{

}
