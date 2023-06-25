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
  public columns = '2';

  constructor(
    private router: Router,
    private common: CommonService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('JAI SHREE RAM!!!');
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

    switch (this.noOfPdfsToShow) {
      case 1:
        this.columns = '1';
        break;
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        this.columns = '3';
        break;
      default:
        break;
    }

    const pdfFromDir = this.common.getPdfsFromDir(this.noOfPdfsToShow);
    console.log(pdfFromDir);
    this.pdfs = pdfFromDir;

    this.cd.markForCheck();
  }

}
