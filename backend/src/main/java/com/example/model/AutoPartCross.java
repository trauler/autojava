package com.example.model;


import javax.persistence.*;

@Table(name = "AUTO_PART_CROSSES")
@Entity
public class AutoPartCross {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "not_oe_brand")
    private String notOeBrand;
    @Column(name = "not_oe_code")
    private String notOeCode;
    @Column(name = "oe_brand")
    private String oeBrand;
    @Column(name = "oe_code")
    private String oeCode;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNotOeBrand() {
        return notOeBrand;
    }

    public void setNotOeBrand(String notOeBrand) {
        this.notOeBrand = notOeBrand;
    }

    public String getNotOeCode() {
        return notOeCode;
    }

    public void setNotOeCode(String notOeCode) {
        this.notOeCode = notOeCode;
    }

    public String getOeBrand() {
        return oeBrand;
    }

    public void setOeBrand(String oeBrand) {
        this.oeBrand = oeBrand;
    }

    public String getOeCode() {
        return oeCode;
    }

    public void setOeCode(String oeCode) {
        this.oeCode = oeCode;
    }
}
