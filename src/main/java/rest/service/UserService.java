package rest.service;


import rest.model.User;

public interface UserService {
    User saveUser(User user);
    User findUserByFirstName(String firstName);
    User updateUser(User user);
    void deleteById(Long id);

}
