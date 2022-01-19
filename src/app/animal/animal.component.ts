import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AnimalService } from '../animal.service';
import { BarnyardService } from '../barnyard.service';
import { GraficoBarrasComponent } from '../grafico-barras/grafico-barras.component';
const Swal = require('sweetalert2')


@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  @ViewChild('modal') modal: any;
  @ViewChild(GraficoBarrasComponent) grafico: GraficoBarrasComponent;
  animals: any = [];
  barnnyardSelected: number = 0;
  barnyards: any = [];
  environment: any = environment;
  animal: any = {};
  filtros: any = {
    name: '',
    limit: ''
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    id: new FormControl(0),
    danger: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    barnyard_id: new FormControl('', [Validators.required]),
  });

  pagination = {
    pageSize: 5,
    page: 1,
    collectionSize: 0
  }
  status: any = 'Inactivo';
  loading: boolean = false;
  showAverage: boolean = false;
  average: any;

  constructor(
    private animalService: AnimalService,
    private barnyardsService: BarnyardService,
  ) { }

  ngOnInit(): void {
    this.getAllBarnyard();
    this.getAllAnimal();
  }


  getAllAnimal() {

    this.animalService.getAnimal({ 'barnyard': this.barnnyardSelected })
      .subscribe((res: any) => {
        console.log(res);
        this.loading = false;
        this.animals = res.data;
      });
  }

  ageAverage() {
    this.animalService.ageAverage({ 'barnyard': this.barnnyardSelected })
      .subscribe((res: any) => {
        this.average = res.data
        this.showAverage = true;
      });
  }


  getAllBarnyard() {

    this.barnyardsService.getBarnyardForSelects()
      .subscribe((res: any) => {
        this.barnyards = res.data
        console.log(res);

      });
  }

  anularOActivar(animal) {

    Swal.fire({
      title: 'Estas Seguro?',
      text: "Deseas registar este empleado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.animalService.deleteAnimal(animal)
          .subscribe((res: any) => {
            if (res.code === 200) {
              this.getAllAnimal();
              Swal.fire({
                title: 'Exito!',
                text: 'Se ha elimanado correctamente',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
              this.grafico.getData();
            } else {
              Swal.fire({
                title: 'Error!',
                text: 'No se ha podido realizar esta operación',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
            }
          });
      }
    })
  }

  openModal() {
    this.modal.show();
  }

  getAnimal(animal) {
    this.form.patchValue({ ...animal });
    this.modal.show()
  }


  getAnimalsByBarnyard() {
    this.getAllAnimal()
  }

  createNewAnimal() {
    this.form.markAsTouched();
    if (this.form.invalid) { return false; }
    if (this.form.get('id').value != 0) {
      this.updateAnimal()
    }
    if (this.form.get('id').value == 0) {
      this.storeAnimal()
    }
  }

  storeAnimal() {
    this.animalService.createNewAnimal(this.form.value)
      .subscribe((res: any) => {
        if (res.code === 200) {
          this.getAllAnimal();
          this.modal.hide();
          Swal.fire({
            title: 'Exito!',
            text: 'Se ha guardado correctamente',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.grafico.getData();
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'No hemos podido completar la operación',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
      });
  }

  updateAnimal() {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "Deseas registar este empleado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.form.markAsTouched();
        if (this.form.invalid) { return false; }
        this.animalService.updateAnimal(this.form.value)
          .subscribe((res: any) => {
            if (res.code === 200) {
              this.getAllAnimal();
              this.modal.hide();
              Swal.fire({
                title: 'Exito!',
                text: 'Se ha guardado correctamente',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
              this.grafico.getData();
            } else {
              Swal.fire({
                title: 'Error!',
                text: 'No hemos podido completar la operación',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
            }
          });
      }
    })



  }


  get name_animal_valid() {
    return (
      this.form.get('name').invalid && this.form.get('name').touched
    )
  }

  get type_animal_valid() {
    return (
      this.form.get('type').invalid && this.form.get('type').touched
    )
  }

  get danger_animal_valid() {
    return (
      this.form.get('danger').invalid && this.form.get('danger').touched
    )
  }

  get age_animal_valid() {
    return (
      this.form.get('age').invalid && this.form.get('age').touched
    )
  }

  get barnyard_id_animal_valid() {
    return (
      this.form.get('barnyard_id').invalid && this.form.get('barnyard_id').touched
    )
  }

}
