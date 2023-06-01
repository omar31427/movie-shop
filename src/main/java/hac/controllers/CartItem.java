package hac.controllers;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component(value="CartItem")
public class CartItem  {

    private Long id;
    private String image;
    private String desc;
    private String name;
    private String release;
    private float price;
    public CartItem() {
    }

    public CartItem(Long id,String image,String desc,String name,String release,float pri) {
        this.id = id;
        this.image = image;
        this.desc = desc;
        this.name = name;
        this.release = release;
        this.price = pri;
    }
    public String getImage() {
        return image;
    }

    public void setImage(String link) {
        this.image = link;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRelease() {
        return release;
    }

    public void setRelease(String release) {
        this.release = release;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float pri) {
        this.price = pri;
    }
}