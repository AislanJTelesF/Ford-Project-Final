import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);


bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
