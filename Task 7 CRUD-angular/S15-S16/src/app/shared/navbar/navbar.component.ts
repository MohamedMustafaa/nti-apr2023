import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  counter:number = 0;
  handleKeyUp = (event: any)=>console.log(event.target.value)
  handleInput = (element :any) => console.log(element.value)
  addNumber = (counter:number)=> this.counter += 1
  subNumber = (counter:number)=> this.counter -= 1
}
