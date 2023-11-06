package com.yaedora;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class testcon {

    @Autowired
    private reptest rep;

    @GetMapping("/")
    public String test(Model model){
        model.addAttribute("test",rep.findAll());
        return "test";
    }
}
