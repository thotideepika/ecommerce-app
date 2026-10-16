package com.ecommerce.controller;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.entity.Category;
import com.ecommerce.entity.Order;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.service.OrderService;
import com.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final ProductService productService;
    private final OrderService orderService;
    private final CategoryRepository categoryRepository;

    // Products
    @PostMapping("/products")
    public ProductDTO createProduct(@RequestBody ProductDTO dto) {
        return productService.create(dto);
    }

    @PutMapping("/products/{id}")
    public ProductDTO updateProduct(@PathVariable Long id, @RequestBody ProductDTO dto) {
        return productService.update(id, dto);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.delete(id);
    }

    @PostMapping("/products/upload")
    public Map<String, String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        String url = productService.uploadImage(file);
        return Map.of("url", url);
    }

    // Categories
    @GetMapping("/categories")
    public List<Category> categories() {
        return categoryRepository.findAll();
    }

    @PostMapping("/categories")
    public Category createCategory(@RequestBody Map<String, String> body) {
        return categoryRepository.save(Category.builder().name(body.get("name")).build());
    }

    // Orders
    @GetMapping("/orders")
    public List<com.ecommerce.dto.OrderDTO> allOrders() {
        return orderService.getAllOrders();
    }

    @PutMapping("/orders/{id}/status")
    public com.ecommerce.dto.OrderDTO updateOrderStatus(@PathVariable Long id,
                                                        @RequestBody Map<String, String> body) {
        Order.OrderStatus status = Order.OrderStatus.valueOf(body.get("status"));
        return orderService.updateStatus(id, status);
    }
}