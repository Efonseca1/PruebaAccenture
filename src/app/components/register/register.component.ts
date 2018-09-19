import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ageValidator } from './../../shared/validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    documento: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    fechaNacimiento: ['', [Validators.required, ageValidator(18)]]
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  enviar(data) {
    console.log(data);
  }



}
