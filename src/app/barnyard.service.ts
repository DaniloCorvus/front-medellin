import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BarnyardService {

  constructor(private http: HttpClient) { }

  getBarnyard() {
    return this.http.get(`${environment.base_url}/barnyards`)
  }

  getBarnyardForSelects() {
    return this.http.get(`${environment.base_url}/barnyards-for-select`)
  }

  createNewBarnyard(data: any) {
    return this.http.post(`${environment.base_url}/barnyards`, data);
  }

  updateBarnyard(data: any) {
    return this.http.patch(`${environment.base_url}/barnyards/` + data['id'], data);
  }

  deleteBarnyard(data: any) {
    return this.http.delete(`${environment.base_url}/barnyards/` + data['id']);
  }

}
