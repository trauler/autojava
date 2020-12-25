package com.example.model;

import javax.persistence.*;

@Table(name = "USERS")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;
    @Column(name = "status")
    private int status;
    @Column(name = "email")
    private String email;
    @Column(name = "name")
    private String name;
    @Column(name = "encrypted_password")
    private String encryptedPassword;

    public User(String email, String name, String encryptedPassword) {
        this.email = email;
        this.name = name;
        this.encryptedPassword = encryptedPassword;
    }
    public User() {}

    @Column(name = "status")
    public int getStatus() {
        return status;
    }
    public void setStatus(int status) {
        this.status = status;
    }

    @Column(name = "email", nullable = true)
    //must be false, yep
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    @Column(name = "name", nullable = true)
    //must be false, yep
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "encrypted_password", nullable = true)
    //must be false, yep
    public String getEncryptedPassword() {
        return encryptedPassword;
    }
    public void setEncryptedPassword(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
