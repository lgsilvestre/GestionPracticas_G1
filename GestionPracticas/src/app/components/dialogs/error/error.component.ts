import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogDataModel} from '../../../model/dialogData.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataModel) { }

  ngOnInit(): void {
  }

}
