import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: Object[] = [
    { name: 'Registro', url: '/registro' },
    { name: 'Solicitud de credito', url: '/credito' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
