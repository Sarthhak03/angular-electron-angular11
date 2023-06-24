/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/indent */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../core/services/electron/common.service';
import * as branding from '../../assets/config/branding.json';
import { AppConfig } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public pdfs: any;
  public noOfPdfsToShow: any;

  constructor(
    private router: Router,
    private common: CommonService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
    this.initPdfs();
  }

  initPdfs() {
    const obj = this.common.getBrandingJSON('branding.json', branding);
    if (AppConfig.environment === 'PROD') {
      this.noOfPdfsToShow = obj;
    } else {
      this.noOfPdfsToShow = obj.default.numberOfPdfsToShow;
      console.log(this.noOfPdfsToShow);
    }

    this.cd.markForCheck();

  }

}
