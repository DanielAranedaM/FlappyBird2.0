import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { ComponentsModule } from './components/components.module';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ComponentsModule],
})
export class HomePage implements OnInit{

  //**Alto y ancho del contenedor del juego*/
  container_height!: number;
  container_width!: number;

  //**variable para definir si el juego inicio o no*/
  //**para ver la pantalla finalizada del juego se cambia en gameOver a true*/
  gameStarted: boolean = false;
  gameOver: boolean = false;

  //**Variabel de Puntaje*/
  score: number = 0;

  //**variable para musica*/
  musicActive: boolean = false;
  audio = new Audio('assets/music/ionic-bird-track.MP3');

  //**variable para la posicion del ave*/
  bird_height: number = 38;
  bird_width: number = 43;
  bird_position: number = 300;

  //**variable para la posicion del obstaculo*/
  obstacle_height: number = 0;
  obstacle_width: number = 52;
  obstacle_position: number = this.container_width;
  //**esta variable representa la distancia entre el obstaculo superior e inferior*/
  obstacle_gap: number = 200;

  bird_interval!:ReturnType<typeof setTimeout>;

  constructor(private platform: Platform) {}

  ngOnInit(): void {
    this.setContainerSize();
    this.bird_interval = setInterval(this.addGravity.bind(this),24);
  }

  //**Definir el tamaño del contenedor*/
  //**en resoluciones mobiles se adapta*/
  setContainerSize(){
    this.container_height = this.platform.height();
    this.container_width = this.platform.width() < 576 ? this.platform.width() :576;
  }

  //**Iniciar Juego*/
  startGame(){
    this.gameStarted = true;
    this.gameOver = false;
    this.score = 0;
  }

  //**Agregar Gravedad*/
  addGravity(){
    let gravity = 4.5;
    //**cuando el juego comience la posicion del pajaro sera la indicada ams la gravedad */
    if (this.gameStarted) this.bird_position += gravity;
  }

  //**Funcion para saltar*/
  //**se valida q el juego este iniciado primero*/
  jump(){
    if (this.gameStarted){
      //**con esta condicion evitamos que el pajaro salga del tope del contenedor*/
      if (this.bird_position < this.bird_height) this.bird_position = 0;
      else this.bird_position -=60;
    }
  }

  //**Funcion para activar y desactivar musica */
  playMusic(){
    this.musicActive = !this.musicActive;
    
    if (this.musicActive){
      this.audio.play()
      this.audio.loop;
    }
    else this.audio.pause();
    
  }

  //**Funcion para mover obstaculos */
  moveObstacle(){
    //**variable para la velocidad de obstaculo*/
    let speed: number = 6;
    //**validamos que el juego inicie*/
    if (this.container_width < 400) speed=4;

    if (this.gameStarted){
      if (this.obstacle_position >= -this.obstacle_width) this.obstacle_position -= speed;
      //**al salir el obstaculo de la pantalla esto lo reseteara */
      else{
        this.resetObstaclePosition();
        //**si el obstaculo sale de la pantalla y aun no pierde el score aumentara en 1*/
        if (this.gameStarted) this.score++;
      }
    }
  }

  //**Funcion para resetear la posicion de los obstaculos */
  resetObstaclePosition(){

  }

}
