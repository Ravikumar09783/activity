import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }


  faqItems = [
    {title:"TERMS OF USE AGREEMENT",
    itemDetails:["Company makes no representation that the Website is appropriate or available in other locations other than where it is operated by Company.", "The Website provides the following service"]
    },
    {title:"PURCHASES; PAYMENT",
    itemDetails:["Company bills you through an online billing account for purchases of products and/or services.", "All payments shall be in U.S. dollars."]
    },
    {title:"RETURN POLICY",
    itemDetails:["Please review our Return Policy posted on our Website prior to making any purchases."]
    },
    {title:"USER REPRESENTATIONS",
    itemDetails:["All registration information you submit is truthful and accurate.","Your use of the Company Services does not violate any applicable law or regulation."]
    }
    
  ]


  ngOnInit(): void {
  }



}
