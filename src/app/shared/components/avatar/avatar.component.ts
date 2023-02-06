import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {


  @Input() size: string;
  @Input() avatar: any;
  constructor() { }

  ngOnInit(): void {
  }

}
