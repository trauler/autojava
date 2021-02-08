package com.example.model;

import javax.persistence.*;
import java.util.List;

@Table(name = "ORDERS")
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station station;
    @OneToMany(mappedBy = "order")
    private List<OrderAutoPart> orderAutoPartList;
    @OneToMany(mappedBy = "order")
    private List<OrderService> orderServiceList;
    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    public List<OrderAutoPart> getOrderAutoPartList() {
        return orderAutoPartList;
    }

    public void setOrderAutoPartList(List<OrderAutoPart> orderAutoPartList) {
        this.orderAutoPartList = orderAutoPartList;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Station getStation() {
        return station;
    }

    public void setStation(Station station) {
        this.station = station;
    }

    public List<OrderService> getOrderServiceList() {
        return orderServiceList;
    }

    public void setOrderServiceList(List<OrderService> orderServiceList) {
        this.orderServiceList = orderServiceList;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }
}