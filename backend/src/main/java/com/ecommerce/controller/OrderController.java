package com.ecommerce.controller;

import com.ecommerce.dto.OrderDTO;
import com.ecommerce.dto.OrderRequest;
import com.ecommerce.entity.User;
import com.ecommerce.service.AuthService;
import com.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final AuthService authService;

    @PostMapping
    public OrderDTO place(Authentication auth, @RequestBody OrderRequest req) {
        return orderService.placeOrder(uid(auth), req);
    }

    @GetMapping
    public List<OrderDTO> myOrders(Authentication auth) {
        return orderService.getUserOrders(uid(auth));
    }

    @GetMapping("/{id}")
    public OrderDTO get(@PathVariable Long id) {
        return orderService.getOrder(id);
    }

    private Long uid(Authentication auth) {
        User u = authService.getCurrentUser(auth.getName());
        return u.getId();
    }
}