import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { GroutingTask, MixingInfo, GroutingHoleItem, GroutingInfo } from 'src/app/models/grouting';
import { Subscription } from 'rxjs';
import { PLC_D, PLC_M } from 'src/app/models/IPCChannel';
import { ElectronService } from 'ngx-electron';
import { NzMessageService } from 'ng-zorro-antd';
import { AppService } from 'src/app/services/app.service';
import { waterBinderRatio, getDatetimeS } from 'src/app/Function/unit';
import { PLCService } from 'src/app/services/plc.service';
import { FC } from 'src/app/models/socketTCP';
import {sleep} from 'sleep-ts';
import { copyAny } from 'src/app/models/baseInit';
import { mixingInfoInit, groutingHoleItemInit, processDataInit } from 'src/app/models/groutingInit';

const cmdarrs = [
  // 完成标志
  { request: FC.FC1, address: PLC_M(46), value: 1, outKey: 'out8' },
  // 开始标准
  { request: FC.FC1, address: PLC_M(50), value: 1, outKey: 'out9' },
  // 梁号
  { request: FC.FC3, address: PLC_D(220), value: 4, outKey: 'out0' },
  // 孔号
  { request: FC.FC3, address: PLC_D(152), value: 2, outKey: 'out1' },
  // 实时数据
  { request: FC.FC3, address: PLC_D(200), value: 6, outKey: 'out2' },
  { request: FC.FC3, address: PLC_D(72), value: 1, outKey: 'out3' },
  { request: FC.FC3, address: PLC_D(52), value: 2, outKey: 'out4' },
  { request: FC.FC3, address: PLC_D(120), value: 1, outKey: 'out5' },
  { request: FC.FC1, address: PLC_M(30), value: 8, outKey: 'out6' },
  { request: FC.FC3, address: PLC_D(520), value: 6, outKey: 'out7' },
];

const groutingHoleItemBase: GroutingHoleItem = {...copyAny(groutingHoleItemInit), processDatas: copyAny(processDataInit)};
// {
//   /** 压浆方向 */
//   direction: null,
//   /** 设置压浆压力 */
//   setGroutingPressure: null,
//   /** 环境温度 */
//   envTemperature: null,
//   /** 浆液温度 */
//   slurryTemperature: null,
//   /** 开始时间 */
//   startDate: null,
//   /** 完成时间 */
//   endDate: null,
//   /** 进浆压力 */
//   intoPulpPressure: null,
//   /** 回浆压力 */
//   outPulpPressure: null,
//   /** 进浆量 (L) */
//   intoPulpvolume: null,
//   /** 回浆量 (L) */
//   outPulpvolume: null,
//   /** 真空泵压力 */
//   vacuumPumpPressure: null,
//   /** 稳压时间 */
//   steadyTime: null,
//   /** 通过情况 */
//   passMsg: null,
//   /** 冒浆情况 */
//   slurryEmittingMsg: null,
//   /** 其他说明 */
//   remarks: null,
//   /** 压浆过程数据 */
//   processDatas: {
//     hz: 1,
//     intoPulpPressure: [],
//     outPulpPressure: [],
//     intoPulpvolume: [],
//     outPulpvolume: [],
//   },
//   /** 真空过程数据 */
//   vacuumPumpProcessDatas: null,
//   /** 其他数据信息 */
// };
@Component({
  selector: 'app-live-grouting',
  templateUrl: './live-grouting.component.html',
  styleUrls: ['./live-grouting.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveGroutingComponent implements OnInit, OnDestroy {

  /** 选择模板 */
  groutingTemplateShow = false;
  /** 模板数据 */
  templateData: GroutingTask = null;
  /** 搅拌数据 */
  mixingData: MixingInfo = {...copyAny(mixingInfoInit), dosage: [0, 0, 0, 0, 0, 0, 0]};
  // {
  //   /** 用量 */
  //   dosage: [0, 0, 0, 0, 0, 0, 0],
  //   /** 开始时间 */
  //   startDate: null,
  //   /** 完成时间 */
  //   endDate: null,
  //   /** 搅拌时间 */
  //   mixingTime: null,
  //   /** 泌水率 */
  //   bleedingRate: null,
  //   /** 流动度 */
  //   fluidity: null,
  //   /** 黏稠度 */
  //   viscosity: null,
  //   /** 水胶比 */
  //   waterBinderRatio: null,
  //   /** 水温 */
  //   waterTemperature: null,
  //   /** 环境温度 */
  //   envTemperature: null,
  // };
  mixingDataNow = {
    state: false,
    time: 0,
    date: null,
    save: false
  };

  /** 压浆数据 */
  groutingHoleItem: GroutingHoleItem = copyAny(groutingHoleItemBase);
  /** 正在压浆数据 */
  now = {
    name: '',
    holeName: '',
    dosage: [null, null, null, null, null, null],
    waterBinderRatio: null
  };
  /** 监控压浆 */
  plcsub: Subscription;
  plcsub1: Subscription;
  monitoringMsg = {
    start: false,
    state: false,
    color: '#d42517',
    save: false
  };
  /** 实时数据 */
  liveT: any;
  liveDelay = 100;
  /** 模拟数据T */
  svgT: any;
  /** 停止监控 */
  stop = false;
  sendData = {
    Count: 0,
    index: 0,
  };
  backData: any = {};
  liveState = false;
  /** plc状态 */
  get plcState(): boolean {
    return this.PLCS.socketInfo.state === 'success';
  }
  /** 添加数据判断 */
  addFilterFun = (o1: any, o2: any) => o1.name === o2.name
    && o1.component === o2.component && o1.project === o2.project;
  /** 修改数据判断 */
  updateFilterFun = (o1: GroutingTask, o2: GroutingTask) => o1.name === o2.name
    && o1.component === o2.component && o1.project === o2.project && o1.id !== o2.id;

  constructor(
    public appS: AppService,
    public PLCS: PLCService,
    private odb: DbService,
    private e: ElectronService,
    private message: NzMessageService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.groutingTemplateShow = true;
    this.PLCS.noOut = true;
    this.plcsub = this.PLCS.LinkState$.subscribe((state) => {
      console.log(state);
      if (state && this.appS.taskLiveState) {
        this.liveState = false;
        this.liveData();
      }
      this.cdr.detectChanges();
    });
  }
  ngOnDestroy() {
    this.PLCS.noOut = false;
    if (this.plcsub) {
      this.plcsub.unsubscribe();
      this.plcsub = null;
    }
    this.exit();
  }
  exit() {
    console.log('退出');
    this.appS.taskLiveState = false;
    this.monitoringMsg.start = false;
    if (this.liveT) {
      clearInterval(this.liveT);
      this.liveT = null;
    }
    if (this.svgT) {
      clearInterval(this.svgT);
      this.svgT = null;
    }

  }
  /** 监控启停 */
  operatorLive() {
    this.stop = !this.stop;
    this.appS.taskLiveState = this.stop;
    console.log(this.appS.taskLiveState);

    if (!this.stop) {
      this.exit();
    } else {
      this.liveData();
    }
    this.cdr.detectChanges();
  }
  /** 实时数据 */
  async liveData() {
    if (this.liveState || !this.appS.taskLiveState || this.monitoringMsg.save) {
      return;
    }
    if (!this.plcState) {
      console.error('请链接设备');
    }
    this.liveState = true;
    this.PLCS.heartbeatState = false;
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < cmdarrs.length;) {
      if (this.monitoringMsg.save) {
        index = cmdarrs.length + 1;
        return;
      }
      const item = cmdarrs[index]
      this.PLCS.ipc({ request: item.request, address: item.address, value: item.value, callpack: item.outKey });
      await new Promise((resolve, reject) => {
        this.e.ipcRenderer.once(item.outKey, (event, data) => {
          if (data.data) {
            index++;
            this[item.outKey](data.data);
            this.cdr.detectChanges();
          }
          resolve();
        });
      })
      // await sleep(1000);
      // console.log(new Date().getSeconds());
    }
    // this.send(this.backData);
    this.liveState = false;
    this.liveData();
  }
  out0 (data) {
    this.now.name = data.str.replace(/\0/g, '');
  }
  out1 (data) {
    this.now.holeName = data.str.replace(/\0/g, '');
  }
  out2 (data) {
    this.mixingData.dosage = data.float.map(m => Number(m.toFixed(2)));
    this.mixingData.waterBinderRatio = waterBinderRatio(this.mixingData.dosage);
  }
  out3 (data) {
    this.mixingData.mixingTime = data.int16[0];
  }
  out4 (data) {
    this.groutingHoleItem.intoPulpPressure = (data.float[0]).toFixed(2);
  }
  out5 (data) {
    this.groutingHoleItem.steadyTime = data.int16[0];
  }
  /** 搅拌 */
  out6 (data) {
    if (!(data instanceof Array)) {
      return;
    }
    /** 搅拌开始 */
    if (!this.mixingDataNow.state && data[0] === '1') {
      console.warn('搅拌开始')

      this.mixingDataNow.state = true;
      this.mixingDataNow.date = new Date();
    }

    /** 上料完成 */
    if (this.mixingDataNow.state && !this.mixingDataNow.save && data[6] === '1' && this.mixingData.mixingTime > 0) {
      this.mixingDataNow.time = this.mixingData.mixingTime;
      this.mixingDataNow.save = true;
    }
    /** 搅拌完成 */
    if (this.mixingDataNow.state && data[6] === '0' && data[0] === '0') {
      if (this.mixingDataNow.save) {
        const mixing: MixingInfo = {
          ...mixingInfoInit,
          /** 用量 */
          dosage: this.mixingData.dosage,
          /** 开始时间 */
          startDate: this.mixingDataNow.date,
          /** 完成时间 */
          endDate: new Date(),
          /** 搅拌时间 */
          mixingTime: this.mixingDataNow.time,
          /** 水胶比 */
          waterBinderRatio: this.mixingData.waterBinderRatio,
        };
        this.save(mixing, null);
      } else {
        this.message.warning('取消搅拌');
      }
      this.mixingDataNow.state = false;
      this.mixingDataNow.save = false;
    }
  }
  out7 (data) {
    const dosage = data.float.map(m => Number(m.toFixed(2)));
    this.now.dosage = dosage;
    this.now.waterBinderRatio = waterBinderRatio(dosage);
  };
  /** 压浆完成 */
  out8(data) {
    if (!(data instanceof Array)) {
      return;
    }
    if (!this.monitoringMsg.save && this.monitoringMsg.start) {
      if (data[0] === '1') {
        this.groutingSave(0);
        this.monitoringMsg.save = true;
        this.monitoringMsg.start = false;
        this.groutingHoleItem.endDate = new Date();
      }
    }
  }
  /** 压浆开始 */
  out9(data) {
    if (!(data instanceof Array)) {
      return;
    }
    if (data[0] === '1' && !this.monitoringMsg.start) {
      this.liveSvg();

      this.monitoringMsg.start = true;
    }
    if (data[0] === '0' && this.monitoringMsg.start) {
      this.monitoringMsg.start = false;
      this.message.warning('取消压浆');
    }
  }
  /** 确认模板监控 */
  async selectGroutingTemp(id) {
    this.templateData = await this.odb.getOneAsync('grouting', (g: GroutingTask) => g.id === id);
    if (this.templateData) {
      const tmps: Array<any> = JSON.parse(localStorage.getItem('groutingTemplate')) || [];
      const count = tmps.filter(item => item.id === id);
      if (count.length === 0) {
        tmps.unshift({name: `${this.templateData.component}/${this.templateData.name}`, id});
      }
      localStorage.setItem('groutingTemplate', JSON.stringify(tmps.splice(0, 10)));
      if (this.plcState) {
        this.appS.taskLiveState = true;
        this.stop = true;
        this.liveData();
      } else {
        if (!this.plcsub) {

        }
      }
    }
    this.groutingTemplateShow = false;
    console.log(id);
    this.cdr.detectChanges();
  }
  /** 压浆曲线监控 */
  liveSvg() {
    console.error('svg');
    if (this.svgT) {
      return;
    } else {
      this.groutingHoleItem = copyAny(groutingHoleItemBase);
      this.groutingHoleItem.startDate = new Date();
      this.svgT = setInterval(() => {
        this.groutingHoleItem.processDatas.intoPulpPressure.push(this.groutingHoleItem.intoPulpPressure);
        if (this.svgT && !this.monitoringMsg.start) {
          clearInterval(this.svgT);
          this.svgT = null;
        }
        this.cdr.detectChanges();
      }, 1000);
    }
  }

  /** 压浆完成保存 */
  async groutingSave(nu) {
    this.PLCS.ipc({ request: FC.FC3, address: PLC_D(270), value: 22, callpack: 'leveGroutingSave' });
    this.e.ipcRenderer.once('leveGroutingSave', (event, data) => {
      console.error('压浆保存数据', nu, data.data);
      if (data.data === null) {
        this.groutingSave(2);
        return;
      }
      try {
        const groutingHoleItem: GroutingHoleItem = {
          ...this.templateData.groutingInfo[0].groups[0],
          /** 压浆方向 */
          // direction: this.templateData.groutingInfo[0].groups[0].direction,
          // /** 设置压浆压力 */
          // setGroutingPressure: this.templateData.groutingInfo[0].groups[0].setGroutingPressure,
          /** 环境温度 */
          envTemperature: null,
          /** 浆液温度 */
          slurryTemperature: null,
          /** 开始时间 */
          startDate: this.groutingHoleItem.startDate,
          /** 完成时间 */
          endDate: this.groutingHoleItem.endDate,
          /** 进浆压力 */
          intoPulpPressure: (data.data.float[3]).toFixed(2),
          /** 回浆压力 */
          outPulpPressure: null,
          /** 进浆量 (L) */
          intoPulpvolume: null,
          /** 回浆量 (L) */
          outPulpvolume: null,
          /** 真空泵压力 */
          vacuumPumpPressure: null,
          /** 稳压时间 */
          steadyTime: data.data.int16[12],
          /** 通过情况 */
          passMsg: null,
          /** 冒浆情况 */
          slurryEmittingMsg: null,
          /** 其他说明 */
          remarks: null,
          /** 压浆过程数据 */
          processDatas: this.groutingHoleItem.processDatas,
          /** 真空过程数据 */
          vacuumPumpProcessDatas: null,
          /** 其他数据信息 */
        };
        this.save(null, groutingHoleItem);
        this.monitoringMsg.save = false;
        this.liveData();
      } catch (error) {
        this.groutingSave(1);
      }
    })
  }
  /** 数据保存 */
  async save(mixing: MixingInfo, groutingHoleItem: GroutingHoleItem) {
    if (groutingHoleItem) {
      groutingHoleItem.direction = this.templateData.groutingInfo[0].groups[0].direction;
      groutingHoleItem.setGroutingPressure = this.templateData.groutingInfo[0].groups[0].setGroutingPressure;
    }
    const getData = await this.odb.getOneAsync('grouting', (g: GroutingTask) =>
      g.name === this.now.name
      && g.project === this.templateData.project
      && g.component === this.templateData.component);
    console.log('save', getData);
    /** 添加 */
    if (!getData) {
      const gdata: GroutingTask = copyAny(this.templateData);
      delete gdata.id;
      gdata.name = this.now.name;
      gdata.tensionDate = null;
      gdata.castingDate = null;
      gdata.template = false;
      gdata.operator = this.appS.userInfo.name;
      gdata.mixingInfo = [];
      gdata.groutingInfo = [];
      if (mixing) {
        gdata.mixingInfo.push(mixing);
      }
      if (groutingHoleItem) {
        // tslint:disable-next-line:max-line-length
        gdata.groutingInfo.push({ ...this.templateData.groutingInfo[0], name: this.now.holeName, uploading: false, state: 2, groups: [groutingHoleItem] });
      }
      const saveback = await this.odb.addAsync('grouting', gdata, (g: GroutingTask) =>
        g.name === gdata.name
        && g.project === gdata.project
        && g.component === gdata.component);
      if (saveback.success) {
        this.message.success('添加成功');
      }
    } else {
      if (mixing) {
        getData.mixingInfo.push(mixing);
      }
      if (groutingHoleItem) {
        let index = null;
        getData.groutingInfo.filter((g, i) => {
          if (g.name === this.now.holeName) {
            index = i;
          }
        });
        if (index !== null) {
          getData.groutingInfo[index].uploading = false;
          getData.groutingInfo[index].groups.push(groutingHoleItem);
        } else {
          // tslint:disable-next-line:max-line-length
          getData.groutingInfo.push({ ...this.templateData.groutingInfo[0], name: this.now.holeName, uploading: false, state: 2, groups: [groutingHoleItem] });
        }
      }
      console.log('save3', getData);
      const saveback = await this.odb.updateAsync('grouting', getData, (o1) => this.updateFilterFun(o1, getData));
      if (saveback.success) {
        // this.taskMenuDom.res({ component: this.data.component, selectBridge: saveback.id });
        this.message.success(`${this.now.name}/${this.now.holeName}-保存完成`);
      }
    }
  }
}
