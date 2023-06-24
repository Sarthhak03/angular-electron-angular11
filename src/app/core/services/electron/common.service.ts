/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/indent */
import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { AppConfig } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private electronService: ElectronService
  ) { }

  getBrandingJSON(fileName: string, filePath: any) {
    let brandingJson;
    if (AppConfig.environment === 'PROD') {
      const appDataPath = this.electronService.app.getAppPath('appData');
      console.log('appDataPath =>', appDataPath);
      const jsonPath = this.getConfigPath(`${appDataPath}/config/`, fileName);
      console.log('jsonPath =>', jsonPath);
      const brandingJsonFile = this.electronService.fs.readFileSync(jsonPath, 'utf8');
      console.log('brandingJsonFile =>', brandingJsonFile);
      const parsedJson = JSON.parse(brandingJsonFile);
      console.log('parsedJson =>', parsedJson);
      brandingJson = parsedJson.numberOfPdfsToShow;
    } else {
      brandingJson = filePath;
    }
    return brandingJson;
  }

  getConfigPath(configPath: string, file: string) {
    if (window.process.platform === 'darwin') {
      const regexp = new RegExp('/Resources/app.asar', 'ig');
      configPath = configPath.replace(regexp, '');
      return `${configPath}/${file}`;
    } else {
      configPath = configPath.replace(/\\/g, '/');
      const regexp = new RegExp('/resources/app.asar', 'ig');
      configPath = configPath.replace(regexp, '');
      return `${configPath}/${file}`;
    }
  }

  getPdfsFromDir(noOfPdfsToShow: any) {
    const dirPath = '../../../../assets/config/Feeds/pdfs/';
    const result: { url: string }[] = [];

    for (let i = 1; i <= noOfPdfsToShow; i++) {
      const pdfUrls = `${dirPath}noticeboard${i}.pdf`;
      result.push({ url: pdfUrls });
    }

    return result;

  }

}
