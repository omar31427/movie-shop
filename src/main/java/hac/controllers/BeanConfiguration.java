package hac.controllers;

import hac.controllers.CartItem;
import hac.controllers.Cart;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.web.context.annotation.ApplicationScope;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.context.annotation.SessionScope;

import java.util.ArrayList;

/**
 * create some beans witn various scopes using QUALIFIERS (method names)
 * since there are multiple methods for creating Label beans, we will need to use @Qualifier
 * to specify which one we want to use
 */
@Configuration
public class BeanConfiguration {


    @Bean
    @SessionScope
    public CartItem sessionCartItem() {
        CartItem item =  new CartItem();
        return item;
    }

    /* BEAN using ctor - session scope */
    @Bean
    @SessionScope
    public Cart sessionCart() {
        Cart cart = new Cart();
        //cart.add(new CartItem("I'm session bean Messages"));
        return cart;
    }
}