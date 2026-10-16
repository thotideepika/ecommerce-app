package com.ecommerce.service;

import com.ecommerce.dto.OrderDTO;
import com.ecommerce.dto.OrderRequest;
import com.ecommerce.entity.*;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final CartService cartService;

    private static final BigDecimal SHIPPING = new BigDecimal("49.00");

    @Transactional
    public OrderDTO placeOrder(Long userId, OrderRequest req) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        if (cartItems.isEmpty()) throw new RuntimeException("Cart is empty");

        BigDecimal subtotal = BigDecimal.ZERO;
        List<OrderItem> items = new ArrayList<>();

        Order order = Order.builder()
                .userId(userId)
                .shippingAddress(req.getShippingAddress())
                .paymentMethod(req.getPaymentMethod() != null ? req.getPaymentMethod() : "COD")
                .paymentStatus("PENDING")
                .build();

        for (CartItem ci : cartItems) {
            Product p = productRepository.findById(ci.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            BigDecimal line = p.getPrice().multiply(BigDecimal.valueOf(ci.getQuantity()));
            subtotal = subtotal.add(line);

            items.add(OrderItem.builder()
                    .order(order)
                    .productId(p.getId())
                    .productName(p.getName())
                    .imageUrl(p.getImageUrl())
                    .quantity(ci.getQuantity())
                    .price(p.getPrice())
                    .build());

            // decrement stock
            p.setStock(Math.max(0, p.getStock() - ci.getQuantity()));
            productRepository.save(p);
        }

        order.setItems(items);
        order.setSubtotal(subtotal);
        order.setShipping(SHIPPING);
        order.setTotal(subtotal.add(SHIPPING));

        Order saved = orderRepository.save(order);
        cartService.clearCart(userId);
        return toDTO(saved);
    }

    public List<OrderDTO> getUserOrders(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public OrderDTO getOrder(Long id) {
        return toDTO(orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found")));
    }

    @Transactional
    public OrderDTO updateStatus(Long orderId, Order.OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return toDTO(orderRepository.save(order));
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .map(this::toDTO).collect(Collectors.toList());
    }

    private OrderDTO toDTO(Order o) {
        OrderDTO dto = new OrderDTO();
        dto.setId(o.getId());
        dto.setSubtotal(o.getSubtotal());
        dto.setShipping(o.getShipping());
        dto.setTotal(o.getTotal());
        dto.setShippingAddress(o.getShippingAddress());
        dto.setStatus(o.getStatus().name());
        dto.setPaymentMethod(o.getPaymentMethod());
        dto.setPaymentStatus(o.getPaymentStatus());
        dto.setCreatedAt(o.getCreatedAt());
        if (o.getItems() != null) {
            dto.setItems(o.getItems().stream().map(i -> {
                OrderDTO.OrderItemDTO d = new OrderDTO.OrderItemDTO();
                d.setId(i.getId());
                d.setProductName(i.getProductName());
                d.setImageUrl(i.getImageUrl());
                d.setQuantity(i.getQuantity());
                d.setPrice(i.getPrice());
                return d;
            }).collect(Collectors.toList()));
        }
        return dto;
    }
}