package com.openclassrooms.mddapi.service;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
	
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException("User not found with email: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(), 
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
    
    public Long findUserIdByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException("User not found with email: " + email));
        return user.getId();
    }
    
    
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> 
            new UsernameNotFoundException("User not found with id: " + id)
        );
    }
    
    @Transactional
    public User updateUser(Long id, String username, String email) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        if (username != null) user.setUsername(username);
        if (email != null) user.setEmail(email);

        return userRepository.save(user); 
    }
}
