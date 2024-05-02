package com.travelsite.travelsite;

import com.travelsite.travelsite.repository.RoleRepository;
import com.travelsite.travelsite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RestController
@CrossOrigin("*")
public class TravelController {
    @Autowired
    TravelDao obj ;
    @Autowired
    UserRepository userRepository ;
    @Autowired
    RoleRepository roleRepository;
    @GetMapping("/PackageData")
    public String getAllPackage(){
        return obj.getSearchData();
    }
    @GetMapping("/packagedetails")
    public List<PackageInfo> getPackageDetails(){
        return obj.getPackageDetails();
    }
    @GetMapping("/packagedetails/{id}")
    public PackDetail getPackDetail(@PathVariable ("id") int id){
        return obj.getPackDetail(id);

    }
    @GetMapping("/packagedetailbycityname/{cityname}")
    public List<PackDetail> getPackDetailByCityName(@PathVariable ("cityname") String cityname ){
        return obj.searchPackageByCity(cityname);
    }

    @GetMapping("/packagedetailsort/{sorttype}")
    public List<PackDetail> getPackDetailSorted(@PathVariable ("sorttype") String sorttype){
        return obj.sortPackages(sorttype);

    }
    @GetMapping("/register")
    public void registerUser(){
        User obj = new User("sanika","sd","sanika@gmail.com","abc23");
        Role role = new Role ("admin");
        roleRepository.save(role);
        //obj.setRoles(role);

       // userRepository.save(obj);

    }
}
