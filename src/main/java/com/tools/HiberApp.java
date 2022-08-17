package com.tools;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

//@SpringBootApplication
@Controller
@SpringBootApplication(exclude = HibernateJpaAutoConfiguration.class)
public class HiberApp extends SpringBootServletInitializer implements ErrorController {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(HiberApp.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(HiberApp.class, args);
    }
    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    @ResponseStatus(HttpStatus.OK)
    public String error() {
        return "forward:/index.html";
    }

}
