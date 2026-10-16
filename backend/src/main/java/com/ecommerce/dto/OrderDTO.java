package com.ecommerce.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDTO {
    private Long id;
    private BigDecimal subtotal;
    private BigDecimal shipping;
    private BigDecimal total;
    private String shippingAddress;
    private String status;
    private String paymentMethod;
    private String paymentStatus;
    private LocalDateTime createdAt;
    private List<OrderItemDTO> items;

    @Data
    public static class OrderItemDTO {
        private Long id;
        private String productName;
        private String imageUrl;
        private Integer quantity;
        private BigDecimal price;
    }
}