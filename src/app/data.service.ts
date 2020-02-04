import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  MyData = {id : '', name : '', phoneNumber : '', email : '',image:'',address:''};
  notification : number = 0;
  
 
  Mydata={image:''}
  constructor() { }
}
