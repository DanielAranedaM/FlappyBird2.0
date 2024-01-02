import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.scss'],
})
export class BirdComponent  implements OnInit {

  //**altura y  ancho del flappy bird*/
  @Input() height!: number;
  @Input() width!: number;
  @Input() top!: number;

  constructor() { }

  ngOnInit() {}

}
