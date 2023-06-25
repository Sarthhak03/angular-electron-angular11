import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective],
  imports: [CommonModule, TranslateModule, FormsModule, PdfViewerModule, MatGridListModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, PdfViewerModule, MatGridListModule]
})
export class SharedModule { }
