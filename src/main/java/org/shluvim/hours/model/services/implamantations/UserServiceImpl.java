package org.shluvim.hours.model.services.implamantations;

import org.shluvim.hours.model.User;
import org.shluvim.hours.model.repositories.UserRepository;
import org.shluvim.hours.model.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository repository;

    @Override
    public User getUser(Long userId) {
        User user = repository.findById(userId).get();
        return user;
    }

    @Override
    public Long saveUser(User user) {
        return repository.save(user).getUserId();
    }

    @Override
    public void deleteUser(Long userId) {
        repository.deleteById(userId);
    }

    @Override
    public List<User> getAllUsers() {
        return repository.findAll();
    }
}
