import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogDataModel} from '../../../model/dialogData.model';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataModel) { }

  ngOnInit(): void {
  }

}
