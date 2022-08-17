package com.tools.dao;

//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.tools.model.EmployeeEntity;

@Repository
public interface EmployeeRepository extends PagingAndSortingRepository<EmployeeEntity, Long>{

}
