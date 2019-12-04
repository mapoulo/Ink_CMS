import { Component, ViewChild } from '@angular/core';
import { MultiFileUploadComponent } from '../components/multi-file-upload/multi-file-upload.component';

import *  as firebase from "firebase";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {


  @ViewChild('barChart',  { static: false }) barChart;

  bars: any;
  colorArray: any;

  @ViewChild(MultiFileUploadComponent, { static: false }) fileField: MultiFileUploadComponent;

  constructor() {

  }


  ionViewDidEnter() {
    this.createBarChart();
  }



  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


  // upload1(){
  //   this.fileChooser.open().then((url)=>{
  //     console.log(url);
  //     this.file.resolveLocalFilesystemUrl(url).then((newUrl)=>{
  //       console.log(JSON.stringify(newUrl));

  //       let dirPath = newUrl.nativeURL;
  //       let dirPathSegments = dirPath.split('/');
  //       dirPathSegments.pop();
  //       dirPath = dirPathSegments.join('/');

  //       this.file.readAsArrayBuffer(dirPath, newUrl.name).then(async(buffer)=>{
  //        await this.upload2(buffer, newUrl.name);
  //       });
       
        
  //     })
  //   })
  // }

  // async upload2(buffer, name ){
  //   let blob = new Blob([buffer], {type : "image/jpeg"});
  //   let storage = firebase.storage();

  //   storage.ref('images/'+ name).put(blob).then(res => {
  //     console.log("Uploaded successfully", res);
      
  //   }).catch(error => {
  //     console.log("Unsuccessful", JSON.stringify(error));
      
  //   })
  // }

  upload(){

    
    console.log("Method is called");
    
    // let files = this.fileField.getFiles();
    // console.log(files);

    // let formData = new FormData();
    // formData.append('somekey', 'some value') // Add any other data you want to send

    // files.forEach((file) => {
    //   formData.append('files[]', file.rawFile, file.name);
    // });

    // POST formData to Server

  }

}