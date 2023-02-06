import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.component.html',
  styleUrls: ['./view-address.component.scss']
})
export class ViewAddressComponent implements OnInit {

  constructor() { }
  @Input() address: any = {};
  addressStr: string;

  ngOnInit(): void {
    //console.log(this.address, "address");
    if(this.address && this.address._id){
      this.getAddressString(this.address);
    }
  }


  getAddressString(address){
     this.addressStr = address.street + ', ' + address.state + ', ' + address.city;
  }

}
