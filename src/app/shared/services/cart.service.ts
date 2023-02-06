import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
    count = 0;
    simpleObservable = new Subject();
    simpleObservable$ = this.simpleObservable.asObservable();
    
    cartItems = new Subject();
    cartItems$ = this.cartItems.asObservable();
    
    constructor() { 
        this.count = this.getCartItemsCount();
        this.simpleObservable.next(this.count);
    }
    /**
     * add new item in cart
     * @param Object cartItemData cart item data
     */
    addCartItem(cartItemData) {
        let cartItems = this.getCartItems();
        let cartKey = this.createCartKey();
        this.count += 1;
        this.simpleObservable.next(this.count);
        cartItems[cartKey] = cartItemData;
        localStorage.setItem('activity_cart_items', JSON.stringify(cartItems));
        
        this.cartItems.next(this.getCartItems());
    }
    
    /**
     * update cart item
     */
    updateCartItem(itemKey, itemData) {
        let cartItems = this.getCartItems();
        
        cartItems[itemKey] = itemData;
        localStorage.setItem('activity_cart_items', JSON.stringify(cartItems));
        this.cartItems.next(this.getCartItems());
    }
    
    /**
     * create key for cart item
     */
    createCartKey() {
        let length = 8;
        let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    
    displayCartItems() {
        return this.cartItems$;
    }
    /**
     * get all items from cart
     */
    getCartItems() {
        let cartItems = JSON.parse(localStorage.getItem('activity_cart_items'));
        if(cartItems) {
            return cartItems;
        }else {
            return {};
        }
    }
    
    /**
     * get the cart item by item key
     * 
     * @param string itemKey
     */
    getCartItem(itemKey) {
        let cartItems = JSON.parse(localStorage.getItem('activity_cart_items'));
        
        return cartItems[itemKey];
    }
    
    /**
     * delete cart item from cart
     * 
     * @param String cartKey
     */
    deleteCartItem(cartKey) {
        let cartItems = this.getCartItems();
        delete cartItems[cartKey];
        localStorage.setItem('activity_cart_items', JSON.stringify(cartItems));
        if (this.count > 0) { this.count-=1 };
        this.simpleObservable.next(this.count);
        this.cartItems.next(this.getCartItems());
    }
    
    getCartItemsCount() {
        let cartItems = this.getCartItems();
        var keys = Object.keys(cartItems);
        var cartSize = keys.length;
        // https://stackoverflow.com/questions/59438039/number-of-elements-on-cart-refreshes-only-after-page-refresh-angular-8
        if(cartSize > 0) {
            return cartSize;
        }
        
        return 0;
    }
    /* delete all items from cart */
    clearCart() {
        localStorage.setItem('activity_cart_items', JSON.stringify({}));
    }
    getCount() {
        return this.simpleObservable$;
    }
}
