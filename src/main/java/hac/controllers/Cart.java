package hac.controllers;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/* this is a simple bean class instantiated in session */

@Component(value="Cart")
public class Cart implements Serializable {
    private ArrayList<CartItem> cart;
    private float cartTotal;

    public Cart() {
        this.cart = new ArrayList<>();

    }

    public ArrayList<CartItem>  getCart() {
        return this.cart;
    }

    public void setCart(ArrayList<CartItem>  cart) {
        this.cart = cart;
    }
    public boolean itemInCart(Long id)
    {
        for (CartItem cartItem : cart)
            if (Objects.equals(cartItem.getId(), id))
                return true;
        return false;
    }
    public void clearCart(){
        cart.clear();
        System.out.println("cart cleared");
    }
    public float getCartTotal(){
        float Total = 0;
        for(CartItem item : cart)
            Total += item.getPrice();

        return Total;
    }
    public void removeCartItem(Long id){
        List<CartItem> itemsToRemove = new ArrayList<>();

        for (CartItem item : cart) {
            if (Objects.equals(item.getId(), id)) {
                itemsToRemove.add(item);
            }
        }

        cart.removeAll(itemsToRemove);
    }
    public void add (CartItem item) {
        cart.add(item);
    }

}