import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http: HttpClient) { }

  getAnimal(params: {}) {
    return this.http.get(`${environment.base_url}/animals`, { params })
  }

  createNewAnimal(data: any) {
    return this.http.post(`${environment.base_url}/animals`, data);
  }

  updateAnimal(data: any) {
    return this.http.patch(`${environment.base_url}/animals/` + data['id'], data);
  }

  deleteAnimal(data: any) {
    return this.http.delete(`${environment.base_url}/animals/` + data['id']);
  }

  ageAverage(params: {}) {
    return this.http.get(`${environment.base_url}/age-average`, { params });
  }

}
