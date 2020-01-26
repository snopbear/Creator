import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  endPoints = {
    model: "http://localhost:3000/model"
  };
  get() {
    debugger
    return this.http.get<any[]>(this.endPoints.model);
  }

  // get(id: number) {
  //   debugger
  //   return this.http.get<any>(`${this.endPoints.company}/${id}`);
  // }
}
