package com.travelsite.travelsite;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @Column (nullable = false , unique = true)
    private String username;
    @Column (nullable = false , unique = true)
    private String email;
    @Column (nullable = false)
    private String password;
    @ManyToMany(fetch = FetchType.EAGER , cascade = CascadeType.ALL)
    @JoinTable (name = "user_roles" , joinColumns = @JoinColumn(name= "user_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name= "role_id", referencedColumnName = "id"))
    private Set<Role> roles;
    public User(String name, String username, String email, String password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User() {

    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setRoles(Role role ) {
        this.roles.add(role);
    }

    public Set<Role> getRoles() {
        return roles;
    }

}
