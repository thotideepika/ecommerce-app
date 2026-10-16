package com.ecommerce.controller;

import com.ecommerce.dto.CartDTO;
import com.ecommerce.entity.User;
import com.ecommerce.service.AuthService;
import com.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;
    private final AuthService authService;

    @GetMapping
    public CartDTO getCart(Authentication auth) {
        return cartService.getCart(uid(auth));
    }

    @PostMapping("/items")
    public CartDTO addItem(Authentication auth, @RequestBody Map<String, Object> body) {
        Long productId = Long.valueOf(body.get("productId").toString());
        Integer qty = body.containsKey("quantity") ? Integer.valueOf(body.get("quantity").toString()) : 1;
        return cartService.addItem(uid(auth), productId, qty);
    }

    @PutMapping("/items/{id}")
    public CartDTO update(Authentication auth, @PathVariable Long id, @RequestBody Map<String, Integer> body) {
        return cartService.updateQuantity(uid(auth), id, body.get("quantity"));
    }

    @DeleteMapping("/items/{id}")
    public CartDTO remove(Authentication auth, @PathVariable Long id) {
        return cartService.removeItem(uid(auth), id);
    }

    private Long uid(Authentication auth) {
        User u = authService.getCurrentUser(auth.getName());
        return u.getId();
    }
}