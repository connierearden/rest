package rest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/user")
    public String userPage () {
        return "user";
    }

    @GetMapping("/admin")
    public  String adminPage () {
        return "admin";
    }


    /*    @GetMapping("/admin")
    public String findAll(Model model, Principal principal){
        List<User> users = userService.findAll();
        User currentUser = userService.findUserByFirstName(principal.getName());
        model.addAttribute("users", users);
        model.addAttribute("user", new User());
        model.addAttribute("currentUser", currentUser);
        return "user-list";
    }*/
}
