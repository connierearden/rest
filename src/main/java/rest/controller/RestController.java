package rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import rest.model.User;
import rest.service.UserServiceImpl;

import java.security.Principal;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
public class RestController {

    private final UserServiceImpl userService;
    @Autowired
    public RestController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/get-all-users")
    public List<User> getAllUsers () {
        return userService.findAll();
    }

    @PostMapping("/create-user")
    public User saveUser (@RequestBody User user) {
        return  userService.saveUser(user);
    }

    @DeleteMapping("/delete-user/{id}")
    public void deleteUser(@PathVariable("id") Long id){
        userService.deleteById(id);
    }

    @PostMapping("/update-user")
    public User updateUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @GetMapping("/get-current-user")
    public User getCurrentUser (Principal principal) {
        return userService.findUserByFirstName(principal.getName());
    }


}
