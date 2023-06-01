package hac;

import hac.controllers.CartItem;
import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * This code is for debugging purposes only.
 * You can check the DB contents by visiting http://localhost:8080/debug/purchases
 * You may add new routes to this controller if you want to test your code.
 * This class will not be graded (ignored by the grader).
 */
@RestController
@RequestMapping("/debug")
public class DebugController {
    @Autowired
    private PurchaseRepository repository;  // this is the JPA repository (SQL database)

    @GetMapping("/purchases")
    public List<Purchase> showPurchases() {

        return repository.findAll(); // this is a JPA method to get all the purchases
    }

  /*  @PostMapping("/purchases")
    public Purchase addPurchase(Purchase purchase) {
        return repository.save(purchase); // this is a JPA method to save a purchase to the database
    }*/
    @CrossOrigin
    @PostMapping("/addPurchase")
    public ResponseEntity<String> addToCart(@RequestParam("firstName") String firstName,
                                            @RequestParam("lastName") String lastName,
                                            @RequestParam("email") String email,
                                            @RequestParam("payment") Double payment) {
        Purchase purchase = new Purchase(email,payment,firstName,lastName);
        repository.save(purchase);
        return ResponseEntity.ok("Movie successfully added to cart");
    }
}
