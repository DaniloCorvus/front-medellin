import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BarnyardService } from '../barnyard.service';

@Component({
  selector: 'app-barnyard',
  templateUrl: './barnyard.component.html',
  styleUrls: ['./barnyard.component.scss']
})
export class barnyardComponent implements OnInit {
  @ViewChild('modal') modal: any;
  barnyards: any = [];
  barnyard: any = {};
  filtros: any = {
    name: '',
    limit: ''
  }
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    id: new FormControl(0),
    description: new FormControl('', [Validators.required]),
    limit: new FormControl(''),
  });
  pagination = {
    pageSize: 5,
    page: 1,
    collectionSize: 0
  }
  status: any = 'Inactivo';
  loading: boolean = false;

  constructor(private barnyardService: BarnyardService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllBarnyard();
  }

  getAllBarnyard(page = 1) {
    this.loading = true;
    this.barnyardService.getBarnyard()
      .subscribe((res: any) => {
        console.log(res);
        this.loading = false;
        this.barnyards = res.data;
      });
  }

  anularOActivar(barnyard) {

    this.barnyardService.deleteBarnyard(barnyard)
      .subscribe((res: any) => {
        if (res.code === 200) {
          this.getAllBarnyard();
          alert('Felicidades, se han Eliminado')
        } else {
          alert('Algunos datos Errores.')
        }
      });

  }


  registerNull(barnyard) {
    this.barnyard = barnyard;

  }

  openModal() {
    this.modal.show();
  }

  getBarnyard(barnyard) {
    this.form.patchValue({ ...barnyard });
    this.modal.show()
  }


  seeAnimals(barnyard) {
    this.router.navigate(['/animals', { id: 1 }]);
  }

  createNewBarnyard() {
    this.form.markAsTouched();
    console.log(this.form.value);
    if (this.form.invalid) { return false; }
    if (this.form.get('id').value != 0) {
      this.updateBarnyard()
    }
    if (this.form.get('id').value == 0) {
      this.storeBarnyard()
    }
  }

  storeBarnyard() {
    this.barnyardService.createNewBarnyard(this.form.value)
      .subscribe((res: any) => {

        if (res.code === 200) {

          this.getAllBarnyard();
          this.modal.hide();
          alert('Felicidades, se ha guadadodo la barnyarda.')
        } else {
          alert('Algunos datos Errores.')
        }
      });
  }

  updateBarnyard() {
    this.form.markAsTouched();
    if (this.form.invalid) { return false; }
    this.barnyardService.updateBarnyard(this.barnyard)
      .subscribe((res: any) => {
        if (res.code === 200) {
          this.getAllBarnyard();
          this.modal.hide();
          alert('Felicidades, se han actualizado las barnyard.')
        } else {
          alert('Algunos datos Errores.')
        }
      });
  }

  get name_barnyard_valid() {
    return (
      this.form.get('name').invalid && this.form.get('name').touched
    )
  }

  get description_barnyard_valid() {
    return (
      this.form.get('description').invalid && this.form.get('description').touched
    )
  }

  get limit_barnyard_valid() {
    return (
      this.form.get('limit').invalid && this.form.get('limit').touched
    )
  }

}
