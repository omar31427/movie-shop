package hac.controllers;
import hac.controllers.Cart;
import hac.controllers.CartItem;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import java.awt.*;
import java.util.ArrayList;

/** note: this IS NOT A REST CONTROLLER : methods return a view name
 and not a JSON object!
 if you want to see an example of REST controller check
 https://github.com/solangek/spring-rest-form
 */
@Controller
@CrossOrigin
@RequestMapping("/api")
public class SpringSessionController {

    @Resource(name="sessionCart")
    private Cart cart;



    @CrossOrigin
    @PostMapping("/addToCart")
    public ResponseEntity<String> addToCart(@RequestParam("movieId") Long id,
                            @RequestParam("image") String image,
                            @RequestParam("desc") String desc,
                            @RequestParam("name") String name,
                            @RequestParam("release") String release,
                            @RequestParam("price") float price) {
        if(!cart.itemInCart(id))
            cart.add(new CartItem(id,image, desc, name, release, price));
        return ResponseEntity.ok("Movie successfully added to cart");
    }


    @GetMapping("/getCart")
    public ResponseEntity<ArrayList<CartItem>> getCartItems() {

        return  ResponseEntity.ok(cart.getCart());

    }
    @GetMapping("/removeCartItem")
    public ResponseEntity<ArrayList<CartItem>> removeCartItem(@RequestParam Long id) {
        if (cart.getCart().isEmpty())
            return ResponseEntity.noContent().build();

        cart.removeCartItem(id);
        return  ResponseEntity.ok(cart.getCart());
    }
    @GetMapping("/clearCart")
    public ResponseEntity<String> clearCart(){

        if (!cart.getCart().isEmpty())
            cart.clearCart();

        return ResponseEntity.ok("Cart successfully cleared");
    }
    @GetMapping("/getCartTotal")
    public ResponseEntity<String> getCartTotal(){
        if (cart.getCart().isEmpty())
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok(String.valueOf(cart.getCartTotal()));
    }
    @PostMapping("/destroy")
    public String destroySession(HttpServletRequest request) {
        request.getSession().invalidate();
        return "redirect:/";
    }
}