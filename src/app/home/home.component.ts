import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ApiService } from './api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  radioSelect: any;
  inputModel: any;
  imageToShow: any;
  isImageLoading: any;

  seasons: string[] = ['50x50', '100x100', '200x200', '300x300'];
  radioGroupValue = [
    { value: 1, display: '50x50' },
    { value: 2, display: '100x100' },
    { value: 3, display: '200x200' },
    { value: 4, display: '300x300' },
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {}

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  generateQrCode() {
    this.isImageLoading = true;
    this.api.getQrCode(this.inputModel, this.radioSelect).subscribe(
      (data) => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      },
      (error) => {
        this.isImageLoading = false;
        console.log(error);
      }
    );
  }
}
