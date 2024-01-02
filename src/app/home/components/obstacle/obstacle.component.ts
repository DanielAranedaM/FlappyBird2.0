import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-obstacle',
  templateUrl: './obstacle.component.html',
  styleUrls: ['./obstacle.component.scss'],
})
export class ObstacleComponent  implements OnInit {

  //**altura y  ancho del flappy bird*/
  @Input() height!: number;
  @Input() width!: number;
  @Input() top!: number;
  @Input() left!: number;
  @Input() rotation!: number;

  constructor() { }

  ngOnInit() {}

}
