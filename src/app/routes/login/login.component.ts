import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DB, DbService } from 'src/app/services/db.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AppService } from 'src/app/services/app.service';
import { User } from 'src/app/models/user.models';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';

const menus = [
  { platform: 'tension,windows', jurisdiction: 0, url: '/tension', icon: 'icon-renwuguanli', name: '张拉' , uid: null},
  { platform: 'tension,windows,electron', jurisdiction: 1, url: '/tension-setting', icon: 'icon-settings-1', name: '张拉设置' , uid: null},
  { platform: 'tension,windows', jurisdiction: 1, url: '/jack', icon: 'icon-yeyaxitong', name: '千斤顶' , uid: null},
  { platform: 'tension,windows', jurisdiction: 0, url: '/live-tension', icon: 'icon-jiankong', name: '张拉监控', uid: 'tensionLink' },
  { platform: 'grouting,windows', jurisdiction: 0, url: '/grouting', icon: 'icon-renwufenpei', name: '压浆' , uid: null},
  { platform: 'grouting,windows,electron', jurisdiction: 1, url: '/grouting-setting', icon: 'icon-185096settingsstreamline', name: '压浆设置' , uid: null},
  { platform: 'grouting,windows', jurisdiction: 0, url: '/live-grouting', icon: 'icon-shishishipinjiankong', name: '压浆监控', uid: 'groutingLink' },
  { platform: 'all', jurisdiction: 1, url: '/project', icon: 'icon-xiangmu', name: '项目' , uid: null},
  { platform: 'all', jurisdiction: 1, url: '/component', icon: 'icon-bridge', name: '构建' , uid: null},
  { platform: 'all,electron', jurisdiction: 1, url: '/user', icon: 'icon-yonghu', name: '用户' },
  { platform: 'all', jurisdiction: 0, url: '/help', icon: 'icon-icon', name: '帮助', uid: null},
];
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  db: DB;
  dyLogin = null;
  users = [];
  sUsers = [];
  msg = null;
  lock = null;

  constructor(
    public appS: AppService,
    public e: ElectronService,
    private fb: FormBuilder,
    private odb: DbService,
    private message: NzMessageService,
    private router: Router,
  ) {
    this.db = this.odb.db;
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [this.appS.platform === 'debug' ? 'Administrator' : null, [Validators.required]],
      password: [this.appS.platform === 'debug' ? 'admin' : null, [Validators.required]]
    });
    // tslint:disable-next-line:no-unused-expression
    return new Promise((resolve, reject) => {
      this.db.users.filter(f => f.jurisdiction < 8).toArray().then((d) => {
        console.log(d);
        this.users = d.map(item => {
          return item.name;
        });
        resolve();
      }).catch(() => {
        this.message.error('获取菜单数据错误!!');
        reject();
      });
    });
  }

  submitForm() {
    if (this.dyLogin) {
      return;
    }
    console.log('1111111111111111111');
    this.dyLogin = setTimeout(() => {
      this.dyLogin = null;
      this.login();
    }, 1000);
  }
  /** 管理登录 */
  adminLogin() {
    clearTimeout(this.dyLogin);
    this.dyLogin = null;
    this.login(true);
    console.log('22222222222222222');
  }
  login(admin = false) {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const value = this.validateForm.value;
    console.log(value, admin, (admin && 1 >= 5));
    this.db.users.filter(a => (a.name === value.userName && a.password === value.password)
      && ((!admin  && a.jurisdiction < 8) || (admin && a.jurisdiction >= 8)) )
      .first().then((user: User) => {
        console.log('登录用户', user);
        if (user) {
          // sessionStorage.setItem('user', JSON.stringify(admin));
          this.appS.userInfo = {
            id: user.id,
            name: user.name,
            jurisdiction: user.jurisdiction,
            nameId: `${user.name}-${user.id}`,
            operation: user.operation || []
          };
          // this.message.success('登录成功🙂');
          /** 菜单过滤 */
          this.appS.menus = menus.filter(menu => {
            if (!this.e.isElectronApp) {
              if (menu.platform.indexOf('electron') > -1) {
                return;
              }
            }
            if (this.appS.platform === 'debug' || menu.platform.indexOf(this.appS.platform) > -1 || menu.platform === 'all') {
              return menu.jurisdiction <= user.jurisdiction;
            }
          });
          const url = JSON.parse(localStorage.getItem(this.appS.userInfo.nameId));
          let goUrl = '/tension';
          if (!url) {
            if (this.appS.platform === 'grouting') {
              goUrl = '/grouting';
            }
          } else {
            goUrl = url.url;
          }
          console.warn(url, goUrl)
          this.router.navigate([goUrl]);
          this.e.ipcRenderer.send('update');
          // if (stateTension) {
          //   this.router.navigate(['/auto']);
          // } else if (this.appS.platform === 'tension') {
          //   this.router.navigate(['/tesnion']);
          // } else if (this.appS.platform === 'grouting') {
          //   this.router.navigate(['/grouting']);
          // } else {
          //   console.log('fsdkjflsdfjsdklfjsdj', url);
          //   if (!url) {
          //     this.router.navigate(['/grouting']);
          //   } else {
          //     this.router.navigate([url.url]);
          //   }
          // }
        } else {
          this.message.error('登录失败😔');
        }
      }).catch(() => {
      });
  }
  // usersInput(value: string): void {
  //   this.sUsers = this.users.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) === 0);
  // }
  touch(msg) {
    console.log(msg);
  }
}
