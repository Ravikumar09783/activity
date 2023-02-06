import { Component, OnInit , Input, HostListener, ElementRef  } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../login-register/auth.service';
import { AddToCartComponent } from "../add-to-cart/add-to-cart.component";
import { LoginRegisterComponent } from "../login-register/login-register.component";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
    @Input() search: string;
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event']) onScrollEvent($event){
        this.isSticky = window.pageYOffset >= 150;
    }
    constructor(private cartservice: CartService, public dialog: MatDialog, private authservice: AuthService, private route: ActivatedRoute) {}
    isCartOpen = false;
    cartItems:any; 
    user:any;
    cartSize:any;  
    sessionImage:any;
    providerId: string;
    locationId: string;
	wasInside:any;
    ngOnInit(): void {
        this.route.queryParams
        .subscribe(params => {
          if(params.providerId && params.locationId){
            this.providerId = params.providerId;
            this.locationId = params.locationId;
          }
        });

        this.cartItems = this.cartservice.getCartItems();
        this.cartSize = this.cartservice.getCartItemsCount();
        this.cartservice.displayCartItems().subscribe(cartItems => {
                this.cartItems = cartItems;


                 console.log('HomeHeaderComponente',cartItems);
            }
        );
        
		
        this.cartservice.getCount().subscribe(count => {
                if(count > 0) {
                    this.cartSize = count;

                    if (this.cartItems.sessionImage != null){

                     this.sessionImage= false;
                    }
                    this.isCartOpen = true;
                }else {
                    this.cartSize = "";
                }
            }
        );
        if(this.cartSize == 0) {
            this.cartSize = "";
        }
        
        this.user = this.authservice.getCurrentUser();
		
	
    }
    
    checkScroll() {
        this.isSticky = window.pageYOffset >= 250;
    }
  
    openCart(event): void {
        this.isCartOpen = !this.isCartOpen;
    }
	

	closeCart = (closecart, cssClass) => {
	//console.log(cssClass);
    closecart.parentElement.classList.remove(cssClass);
}
    
    removeCartItem(cartKey) {
        this.cartservice.deleteCartItem(cartKey);
    }
    
    showLogin(event) {
        const dialogRef = this.dialog.open(LoginRegisterComponent);

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
    }
    editCartItem(itemKey) {
        let cartItem = this.cartservice.getCartItem(itemKey);
        if(cartItem) {
            let sessionId = cartItem.session_id;
            const dialogRef = this.dialog.open(AddToCartComponent, {data: {sessionId: sessionId, itemKey: itemKey}, panelClass: 'add-to-cart-modal'});
            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
            });
        }
    }
    logout() {
        console.log('heyyyy');
        this.authservice.logout();
    }

	@HostListener('click')
		clickInside() 
	{
		this.isCartOpen = true;
		this.wasInside = true;
	}

	@HostListener('document:click')
	clickout()
	{
		if (!this.wasInside) {
		this.isCartOpen = false;
		}
		this.wasInside = false;
	}
	
	
	
}
