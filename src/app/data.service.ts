import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  MyData = {id : '', name : '', phoneNumber : '', email : ''};
  Mydata={image:''}
  constructor() { }
}
