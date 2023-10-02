import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string='http://localhost:3000/data'
  constructor(private http:HttpClient) { }

  getRegisteredUserId(id:any){
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }

  updateUserStatus(userId: number, status: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${userId}`, { enable: status });
  }
  getUser(id: any) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
  saveUser(user: User) {
    if (user.id) {
      return this.http.put(`${this.baseUrl}/${user.id}`, user);
    } else {
      return this.http.post(this.baseUrl, user);
    }
  }

  getOne(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }


}
