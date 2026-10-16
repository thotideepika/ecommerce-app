package com.ecommerce.service;

import com.ecommerce.dto.CartDTO;
import com.ecommerce.dto.CartItemDTO;
import com.ecommerce.entity.CartItem;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    private static final BigDecimal SHIPPING = new BigDecimal("49.00");

    public CartDTO getCart(Long userId) {
        List<CartItem> items = cartItemRepository.findByUserId(userId);
        return toDTO(items);
    }

    @Transactional
    public CartDTO addItem(Long userId, Long productId, Integer quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem item = cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElse(CartItem.builder()
                        .userId(userId)
                        .productId(productId)
                        .quantity(0)
                        .priceAtAdd(product.getPrice())
                        .build());

        item.setQuantity(item.getQuantity() + quantity);
        cartItemRepository.save(item);
        return getCart(userId);
    }

    @Transactional
    public CartDTO updateQuantity(Long userId, Long itemId, Integer quantity) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        if (quantity <= 0) {
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }
        return getCart(userId);
    }

    @Transactional
    public CartDTO removeItem(Long userId, Long itemId) {
        cartItemRepository.deleteById(itemId);
        return getCart(userId);
    }

    @Transactional
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }

    private CartDTO toDTO(List<CartItem> items) {
        List<CartItemDTO> itemDTOs = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;

        for (CartItem item : items) {
            Product p = productRepository.findById(item.getProductId()).orElse(null);
            if (p == null) continue;

            CartItemDTO dto = new CartItemDTO();
            dto.setId(item.getId());
            dto.setProductId(p.getId());
            dto.setProductName(p.getName());
            dto.setImageUrl(p.getImageUrl());
            dto.setQuantity(item.getQuantity());
            dto.setPrice(p.getPrice());
            dto.setStock(p.getStock());
            BigDecimal line = p.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            dto.setLineTotal(line);
            subtotal = subtotal.add(line);
            itemDTOs.add(dto);
        }

        CartDTO cart = new CartDTO();
        cart.setItems(itemDTOs);
        cart.setSubtotal(subtotal);
        cart.setShipping(subtotal.compareTo(BigDecimal.ZERO) > 0 ? SHIPPING : BigDecimal.ZERO);
        cart.setTotal(subtotal.add(cart.getShipping()));
        cart.setItemCount(itemDTOs.stream().mapToInt(CartItemDTO::getQuantity).sum());
        return cart;
    }
}