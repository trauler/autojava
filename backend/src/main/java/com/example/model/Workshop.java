package com.example.model;

import javax.persistence.*;
import java.sql.DatabaseMetaData;
import java.sql.Date;

@Table(name = "WORKSHOP")
@Entity
public class Workshop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "vid")
    private Integer vid;
    @Column(name = "name")
    private String name;
    @Column(name = "updated_at")
    private Date updatedAt; //fix it

    public Workshop(String name) {
        this.name = name;
    }
    public Workshop(){};

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

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
