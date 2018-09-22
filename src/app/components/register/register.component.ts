import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ageValidator } from './../../shared/validator';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;

  private itemsCollection: AngularFirestoreCollection<any>;
  // items: Observable<any[]>;

  documentoExiste = false;

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore
  ) {
    this.itemsCollection = db.collection<any>('registro');
    // this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() {
    this.setForm();

    // Observable para validacion de documento
    const documento = document.getElementById('document');
    const source = fromEvent(documento, 'keyup');
    source.pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
      .subscribe((data) => {
        // console.log(this.registerForm.value.documento);
        this.docValidator(this.registerForm.value.documento);
      });
  }

  setForm() {
    this.registerForm = this.fb.group({
      documento: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]
      ],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required, ageValidator(18)]]
    });
  }

  enviar(data) {
    const registro = Object.assign({}, data)
    this.itemsCollection.add(registro);
    this.setForm();
  }

  docValidator(documento) {
    this.db.collection('registro', ref => ref.where('documento', '==', documento))
      .valueChanges()
      .subscribe((res) => {
        if (res.length >= 1) {
          this.documentoExiste = true;
        } else {
          this.documentoExiste = false;
        }
      });
  }
}
