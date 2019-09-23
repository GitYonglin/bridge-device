import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { NgxElectronModule } from 'ngx-electron';
import { NgZorroAntdModule, NZ_I18N, zh_CN, NZ_ICONS } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LayoutModule } from './layout/layout.module';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCERS } from './ngrx/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './ngrx/effects/app.effects';
import { JackComponent } from './routes/task/components/jack/jack.component';
import { ProjectComponent } from './routes/task/components/project/project.component';
import { ComponentComponent } from './routes/component/component.component';
import { UserComponent } from './routes/user/user.component';
import { HelpComponent } from './routes/help/help.component';
import { TaskComponent } from './routes/task/task.component';
import { GroutingComponent } from './routes/grouting/grouting.component';
import { LoginComponent } from './routes/login/login.component';

registerLocaleData(zh);


@NgModule({
  declarations: [
    AppComponent,

    // JackComponent,
    // ProjectComponent,
    // ComponentComponent,
    // UserComponent,
    // TaskComponent,
    // GroutingComponent,
    LoginComponent,
    HelpComponent,
  ],
  imports: [
    NgxElectronModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICONS, useValue: AllIcons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
