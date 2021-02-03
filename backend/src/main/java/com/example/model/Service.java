package com.example.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Table(name = "service")
@Entity
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "vid")
    private Integer vid;
    @Column(name = "name")
    private String name;
    @Column(name = "cost")
    private Integer cost;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getVid() {
        return vid;
    }

    public void setVid(Integer vid) {
        this.vid = vid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}