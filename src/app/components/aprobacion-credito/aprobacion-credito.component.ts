import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { fechaIngresoValidator } from './../../shared/validator';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';



@Component({
  selector: 'app-aprobacion-credito',
  templateUrl: './aprobacion-credito.component.html',
  styleUrls: ['./aprobacion-credito.component.css']
})
export class AprobacionCreditoComponent implements OnInit {

  solicitudCredito: FormGroup;
  usuario: any;
  usuarioExiste: boolean = false;
  message: string;
  mensajeAprobacion: string;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private fb: FormBuilder, private db: AngularFirestore) {
    this.itemsCollection = db.collection<any>('creditos');
  }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.solicitudCredito = this.fb.group({
      nombreEmpresa: ['', [Validators.required]],
      NIT: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      salario: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.max(100000000)
      ]
      ],
      fechaIngreso: ['', [Validators.required, fechaIngresoValidator()]],
    });
  }

  buscarUsuario(nId) {
    this.db.collection<any>('registro', ref => ref.where('documento', '==', nId))
      .valueChanges()
      .subscribe((data) => {
        if (data.length >= 1) {
          this.usuarioExiste = true;
          this.usuario = data[0];
          delete this.message;
        } else {
          this.usuarioExiste = false;
          this.message = 'Usuario no esta registrado';
        }
      });
  }

  calculateLoan(data) {
    console.log(data);

    const fechaIng = new Date(data.fechaIngreso).getTime();
    const fecha = new Date().getTime();
    const diff = Math.floor((fecha - fechaIng) / (1000 * 60 * 60 * 24));
    let valorAprobado;
    if (diff < 549) {
      console.log('no aprovado: ', diff);
      this.mensajeAprobacion = 'No aprobado: Debe llevar mas de 18 meses en su empresa.';
      valorAprobado = 0;
    } else {
      if (data.salario <= 800000) {
        console.log('no aprovado: ', data.salario);
        valorAprobado = 0;
        this.mensajeAprobacion = "No Aprobado: Su salario debe ser mayor a 800.000";
      } else if (data.salario >= 800000 && data.salario <= 1000000) {
        console.log('aprovado 5mm: ', data.salario);
        valorAprobado = 5000000;
        this.mensajeAprobacion = "Aprobado: Se aprobaron 5.000.000";
      } else if (data.salario <= 4000000 && data.salario > 1000000) {
        console.log('aprovado 20mm: ', data.salario);
        valorAprobado = 20000000;
        this.mensajeAprobacion = "Aprobado: Se aprobaron 20.000.000";
      } else if (data.salario > 4000000) {
        console.log('aprovado 50mm: ', data.salario);
        valorAprobado = 50000000;
        this.mensajeAprobacion = "Aprobado: Se aprobaron 50.000.000";
      }
    }

    this.setForm();
    this.itemsCollection.add({
      usuario: this.usuario.documento,
      valorAprobado
    });
  }
}
