package com.ecommerce.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class CartDTO {
    private List<CartItemDTO> items;
    private BigDecimal subtotal;
    private BigDecimal shipping;
    private BigDecimal total;
    private Integer itemCount;
}