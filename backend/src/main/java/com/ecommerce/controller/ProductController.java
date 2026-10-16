package com.ecommerce.controller;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public List<ProductDTO> list(@RequestParam(required = false) String q,
                                 @RequestParam(required = false) Long categoryId) {
        if (q != null && !q.isEmpty()) return productService.search(q);
        if (categoryId != null) return productService.byCategory(categoryId);
        return productService.getActiveProducts();
    }

    @GetMapping("/{id}")
    public ProductDTO get(@PathVariable Long id) {
        return productService.get(id);
    }
}