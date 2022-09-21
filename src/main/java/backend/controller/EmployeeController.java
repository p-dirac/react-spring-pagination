package backend.controller;
//

//
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.EmployeeEntity;
import backend.dao.EmployeeRepository;
import backend.model.PageData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("/back")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeRepository eRepo;

    /**
     * Get employees one page at a time.
     * 
     * @param pageNum in path, page number starts at zero
     * @param pageSize number of rows to retrieve from database table
     * @return list of employees
     */
    @GetMapping("/employees/{page}/{size}")
    public PageData<EmployeeEntity> getAllEmployees(@PathVariable("page") Integer pageNum, @PathVariable("size") Integer pageSize) {
        String sortBy = "name";
        // In PageRequest, page count starts at zero
        Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
        // findAll returns a Page of entities meeting the paging restriction
        Page<EmployeeEntity> pagedResult = eRepo.findAll(paging);
        if (pagedResult.hasContent()) {
        //convert Page to simpler format in PageData
        PageData<EmployeeEntity> pageData = new PageData(pagedResult.getSize(), 
                pagedResult.getTotalPages(), pagedResult.getContent());
           // long totalPages = pagedResult.getTotalPages();
            return pageData; //pagedResult.getContent();
        } else {
            PageData<EmployeeEntity> pageData = new PageData(); 
            return pageData; 
        }
    }

    @GetMapping("/employees/{id}")
    public EmployeeEntity getEmployeeById(@PathVariable Long id) {
        return eRepo.findById(id).get();
    }

    @PostMapping("/employees")
    public EmployeeEntity saveEmployeeDetails(@RequestBody EmployeeEntity employee) {
        return eRepo.save(employee);
    }

    @PutMapping("/employees")
    public EmployeeEntity updateEmployee(@RequestBody EmployeeEntity employee) {
        return eRepo.save(employee);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<HttpStatus> deleteEmployeeById(@PathVariable Long id) {
        eRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
