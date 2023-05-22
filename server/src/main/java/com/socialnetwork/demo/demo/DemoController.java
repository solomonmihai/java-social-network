package com.socialnetwork.demo.demo;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/demo-controller")
public class DemoController {
  @GetMapping
  public ResponseEntity<String> helloWorld() {
    return ResponseEntity.ok("hello world from api");
  }
}
