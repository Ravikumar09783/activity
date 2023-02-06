import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
	title = 'Vendor';
	constructor(private route: ActivatedRoute, private router: Router) {
		this.route.params.subscribe(params => {
			console.log(params);
		});
	}
	
	ngOnInit(): void {
		
	}

}
