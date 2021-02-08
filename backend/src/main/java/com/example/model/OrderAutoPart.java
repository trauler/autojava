package com.example.model;

import javax.persistence.*;
import java.math.BigDecimal;

@Table(name = "order_auto_part")
@Entity
public class OrderAutoPart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "quantity")
    private BigDecimal quantity;
    @ManyToOne
    @JoinColumn(name = "auto_part_id")
    private AutoPart autoPart;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public AutoPart getAutoPart() {
        return autoPart;
    }

    public void setAutoPart(AutoPart autoPart) {
        this.autoPart = autoPart;
    }
}
