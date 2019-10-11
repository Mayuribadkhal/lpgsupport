import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';
import { Router } from '@angular/router';
import * as angular from 'angular';
import { setAngularLib } from '@angular/upgrade/static';
import { componentFactoryName } from '@angular/compiler';
import { AppComponent } from '@app/app.component';
setAngularLib(angular);
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
.then(platformRef => {
  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.documentElement, ['supportGrids']);
  upgrade.ngZone.run(() => {
    upgrade.injector.get(Router).initialNavigation();
  });
});