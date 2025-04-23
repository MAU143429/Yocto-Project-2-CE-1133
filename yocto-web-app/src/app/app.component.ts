import { Component, OnInit } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private api:APIService, private sharedService: SharedService) {
    this.sharedService.register$.subscribe(valor => {
      this.registro = valor;
    });
  }

  testConnection() {
    this.api.getPrueba().subscribe({
      next: (response) => console.log('Respuesta:', response),
      error: (err) => console.error('Error:', err)
    });
  }

  ngOnInit(): void {
    this.testConnection();
  }

  title = 'yocto-web-app';
  login = true;
  registro = false;
}
