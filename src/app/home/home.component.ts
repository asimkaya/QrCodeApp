import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { ApiService } from './api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

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
    this.blockUI.start();
    this.isImageLoading = true;
    this.api.getQrCode(this.inputModel, this.radioSelect).subscribe(
      (data) => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
        this.blockUI.stop();
      },
      (error) => {
        this.isImageLoading = false;
        console.log(error);
      }
    );
  }
}
