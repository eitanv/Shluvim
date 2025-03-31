package org.shluvim.hours.model.services;

import org.shluvim.hours.model.User;

import java.util.List;

public interface UserService {

    User getUser(Long userId);

    Long saveUser(User user);

    void deleteUser(Long userId);

    List<User> getAllUsers();
}
