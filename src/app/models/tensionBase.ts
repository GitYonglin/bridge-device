import { TensionTask, TensionHoleInfo, TensionHoleTask, TensionStage, CalculateInfo, TensionRecord, OnceRecord, TensionRecordStage, Process, Make, JackProcess } from './tension';
import { taskBaseInit, getModelBase, baseEnum } from './baseInit';



export const tensionTaskInit: TensionTask = {
  ...taskBaseInit,
  /** 梁长度 */
  beamLength: null,
  /** 张拉日期 */
  tensionDate: null,
  /** 浇筑日期 */
  castingDate: null,
  /** 张拉顺序 */
  sort: [],
  /** 设备编号 */
  deviceNo: null,
  /** 是否作为模板 */
  template: null,
  /** 施工员 */
  operator: '',
  /** 监理 */
  supervisors: '',
  /** 自检员 */
  qualityInspector: '',
  /** 张拉孔数据 */
  tensionHoleInfos: []// Array<TensionHoleInfo>;
}
export const tensionHoleInfoInit: TensionHoleInfo = {
  /** 孔号 */
  name: '',
  /** 张拉工艺(先张，后张，分级张拉第一级，分级张拉第二级等) */
  stretchDrawProcess: '',
  /** 张拉长度 */
  length: null,
  /** 钢绞线数量 */
  steelStrandNum: null,
  /** 张拉状态   =0 未张拉    =1一次张拉完成   =2 已张拉 */
  state: null,
  /** 上传状态 */
  uploading: null,
  /** 其它数据 */
  otherInfo: [],
  /** task */
  tasks: []// Array<TensionHoleTask>;
}
/** 张拉任务 */
export const tensionHoleTaskInit: TensionHoleTask = {
  /** 二次张拉 */
  twice: false,
  /** 超张拉 */
  super: false,
  /** 补张拉 */
  mend: false,
  /** 设置张拉应力 */
  tensionKn: null,
  /** 张拉阶段 */
  stage: null, // TensionStage;
  /** 张拉设备 */
  device: null, // TensionDevice;
  /** 张拉模式  =42为4顶两端 =41为4顶单端  =21为2顶A1A2单端 =22为2顶A1B1单端 =23为2顶A1A2两端  =24为2顶B1B2两端 =25为2顶A1B1两端  =11为1顶A1单端  =12为1顶B1单端 =13为A1A2B1单端 */
  mode: null,
  /** 其它数据 */
  otherInfo: [],
  /** 张拉记录 */
  record: null, // TensionRecord;
}
/** 张拉阶段 */
export const tensionStageInit: TensionStage = {
  /** 张拉阶段应力百分比 */
  knPercentage: [10, 20, 50, 100],
  /** 阶段说明（初张拉 阶段一 超张拉 补张拉...） */
  msg: ['初张拉', '阶段一', '阶段二', '终张拉'],
  /** 阶段保压时间 */
  time: [30, 30, 30, 300],
  /** 卸荷比例 */
  uploadPercentage: 10,
  /** 卸荷延时 */
  uploadDelay: 10,
  A1: null,
  A2: null,
  B1: null,
  B2: null,
}

/** 计算数据 */
export const calculateInfoInit: CalculateInfo = {
  /** 回缩量 */
  reboundMm: null,
  /** 工作长度 */
  wordMm: null,
  /** 理论申长量 */
  theoryMm: null,
}
/** 记录 */
export const tensionRecordInit: TensionRecord = {
  /** 张拉状态 =1一次张拉完成   =2 已张拉 */
  state: null,
  /** 过程记录 */
  groups: [] // Array<OnceRecord>
}
/** 每次张拉记录 */
export const onceRecordInit: OnceRecord = {
  /** 开始时间 */
  startDate: null,
  /** 完成时间 */
  endDate: null,
  /** 张拉阶段应力百分比 */
  knPercentage: [],// Array<number>;
  /** 阶段名称 */
  msg: [],
  /** 阶段保压时间 */
  time: [],// Array<number>;
  /** 卸荷比例 */
  uploadPercentage: null,
  /** 卸荷延时 */
  uploadDelay: null,
  /** 阶段记录 */
  A1: null,// TensionRecordStage;
  A2: null,// TensionRecordStage;
  B1: null,// TensionRecordStage;
  B2: null,// TensionRecordStage;
  /** 张拉过程数据 */
  datas: null // Process;
}
/** 张拉阶段记录 */
export const tensionRecordStageInit: TensionRecordStage = {
  /** 阶段压力 */
  mpa: [],// Array<number>;
  /** 阶段位移 */
  mm: [],// Array<number>;
  /** 回油压力 */
  initMpa: null,
  /** 回油位移 */
  initMm: null,
}
/** 张拉过程数据 */
export const processInit: Process = {
  /** 采集频率 */
  hz: null,
  A1: null,// JackProcess;
  A2: null,// JackProcess;
  B1: null,// JackProcess;
  B2: null,// JackProcess;
  /** 说明 */
  msg: [] // Array<Make>;
}
/** 过程信息记录 */
export const makeInit: Make = {
  /** 说明 */
  msg: null,
  /** 过程index */
  index: null,
}
/** 顶过程记录 */
export const jackProcessInit: JackProcess = {
  /** 压力记录 */
  mpa: [],// Array<number>;
  /** 位移记录 */
  mm: [],// Array<number>;
}



export const tensionBase: TensionTask = {
  ...taskBaseInit,
  id: null,
  name: '测试base',
  createdDate: null,
  modificationDate: null,
  user: null,
  project: null,
  component: '测试数据',
  /** 梁长度 */
  beamLength: null,
  /** 张拉日期 */
  tensionDate: null,
  /** 浇筑日期 */
  castingDate: null,
  /** 压浆顺序 */
  sort: null,
  /** 压浆开始日期 */
  startDate: null,
  /** 压浆完成日期 */
  endDate: null,
  /** 设备编号 */
  deviceNo: null,
  /** 是否作为模板 */
  template: false,
  /** 其他数据信息 */
  otherInfo: [
    { key: '123', value: '123' }
  ],
  /** 施工员 */
  operator: null,
  /** 监理员 */
  supervisors: null,
  /** 自检员 */
  qualityInspector: null,
  tensionHoleInfos: [
    {
      /** 孔号 */
      name: 'N1/N2',
      // tslint:disable-next-line:max-line-length

      /** 张拉工艺(先张，后张，分级张拉第一级，分级张拉第二级等) */
      stretchDrawProcess: '后张',
      /** 张拉长度 */
      length: 20,
      /** 钢绞线数量 */
      steelStrandNum: 5,
      /** 张拉状态   =0 未张拉    =1一次张拉完成   =2 已张拉 */
      state: 0,
      /** 上传状态 */
      uploading: false,
      otherInfo: [
        { key: '其他一', value: '其他一' }
      ],
      /** task */
      tasks: [
        {
          /** 二次张拉 */
          twice: false,
          /** 超张拉 */
          super: false,
          /** 补张拉 */
          mend: false,
          /** 设置张拉应力 */
          tensionKn: 100,
          /** 张拉设备 */
          device: getModelBase(baseEnum.jack),
          // tslint:disable-next-line:max-line-length
          /** 张拉模式  =42为4顶两端 =41为4顶单端  =21为2顶A1A2单端 =22为2顶A1B1单端 =23为2顶A1A2两端  =24为2顶B1B2两端 =25为2顶A1B1两端  =11为1顶A1单端  =12为1顶B1单端 =13为A1A2B1单端 */
          mode: 42,
          otherInfo: [
            { key: '123', value: '123' }
          ],
          /** 张拉阶段 */
          stage: {
            /** 张拉阶段应力百分比 */
            knPercentage: [10, 20, 50, 100],
            /** 阶段说明（初张拉 阶段一 超张拉 补张拉...） */
            msg: ['初张拉', '阶段一', '阶段二', '终张拉'],
            /** 阶段保压时间 */
            time: [30, 30, 30, 300],
            /** 卸荷比例 */
            uploadPercentage: 15,
            /** 卸荷延时 */
            uploadDelay: 15,
            A1: { reboundMm: 3.5, wordMm: 5, theoryMm: 208 },
            A2: { reboundMm: 3.5, wordMm: 4, theoryMm: 208 },
            B1: { reboundMm: 3.5, wordMm: 3, theoryMm: 208 },
            B2: { reboundMm: 3.5, wordMm: 2, theoryMm: 208 },
          },
          /** 张拉记录 */
          record: {
            /** 张拉状态 =1一次张拉完成   =2 已张拉 */
            state: 2,
            /** 过程记录 */
            groups: [
              {
                startDate: null,
                endDate: null,
                /** 张拉阶段应力百分比 */
                knPercentage: [10, 20, 50, 100],
                /** 阶段名称 */
                msg: ['初张拉', '阶段一', '阶段二', '终张拉'],
                /** 阶段保压时间 */
                time: [1, 2, 3, 4],
                /** 卸荷比例 */
                uploadPercentage: 15,
                /** 卸荷延时 */
                uploadDelay: 15,
                /** 阶段记录 */
                A1: {
                  /** 阶段压力 */
                  mpa: [1, 2, 3, 4],
                  /** 阶段位移 */
                  mm: [4, 3, 2, 1],

                  /** 回油压力 */
                  initMpa: 1,
                  /** 回油位移 */
                  initMm: 1,
                },
                A2: {
                  /** 阶段压力 */
                  mpa: [1, 2, 3, 4],
                  /** 阶段位移 */
                  mm: [4, 3, 2, 1],
                  /** 回油压力 */
                  initMpa: 1,
                  /** 回油位移 */
                  initMm: 1,
                },
                B1: {
                  /** 阶段压力 */
                  mpa: [1, 2, 3, 4],
                  /** 阶段位移 */
                  mm: [4, 3, 2, 1],
                  /** 回油压力 */
                  initMpa: 1,
                  /** 回油位移 */
                  initMm: 1,
                },
                B2: {
                  /** 阶段压力 */
                  mpa: [1, 2, 3, 4],
                  /** 阶段位移 */
                  mm: [4, 3, 2, 1],
                  /** 回油压力 */
                  initMpa: 1.4,
                  /** 回油位移 */
                  initMm: 1.44
                },
                /** 张拉过程数据 */
                datas: {
                  ...processInit,
                  hz: 1,
                  A1: {
                    mpa: [
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                    ],
                    mm: [
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                    ],
                  },
                  A2: {
                    mpa: [
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                    ].map(m => Number((m * 4.5).toFixed(2))),
                    mm: [
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      5.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                    ].map(m => Number((m * 4.2).toFixed(2))),
                  },
                  B1: {
                    mpa: [
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                    ].map(m => Number((m * 3.9).toFixed(2))),
                    mm: [
                      2.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      2.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      2.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      2.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      2.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      2.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      2.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      2.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      2.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                    ].map(m => Number((m * 2).toFixed(2))),
                  },
                  B2: {
                    mpa: [
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      3.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                    ].map(m => Number((m * 3).toFixed(2))),
                    mm: [
                      8.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      8.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      8.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      8.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      8.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      8.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      8.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      8.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                      8.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5,
                    ].map(m => Number((m * 3).toFixed(2))),
                  }
                }
              }
            ]
          },
        }
      ]
    },
    {
      /** 孔号 */
      name: 'N3/N4',
      // tslint:disable-next-line:max-line-length

      /** 张拉工艺(先张，后张，分级张拉第一级，分级张拉第二级等) */
      stretchDrawProcess: '后张',
      /** 张拉长度 */
      length: 20,
      /** 钢绞线数量 */
      steelStrandNum: 5,
      /** 张拉状态   =0 未张拉    =1一次张拉完成   =2 已张拉 */
      state: 0,
      /** 上传状态 */
      uploading: false,
      otherInfo: [
        { key: '其他一', value: '其他一' }
      ],
      /** task */
      tasks: [
        {
          /** 二次张拉 */
          twice: false,
          /** 超张拉 */
          super: false,
          /** 补张拉 */
          mend: false,
          /** 设置张拉应力 */
          tensionKn: 123,
          /** 张拉设备 */
          device: getModelBase(baseEnum.jack),
          // tslint:disable-next-line:max-line-length
          /** 张拉模式  =42为4顶两端 =41为4顶单端  =21为2顶A1A2单端 =22为2顶A1B1单端 =23为2顶A1A2两端  =24为2顶B1B2两端 =25为2顶A1B1两端  =11为1顶A1单端  =12为1顶B1单端 =13为A1A2B1单端 */
          mode: 42,
          otherInfo: [
            { key: '123', value: '123' }
          ],
          /** 张拉阶段 */
          stage: {
            /** 张拉阶段应力百分比 */
            knPercentage: [15, 30, 50, 100],
            /** 阶段说明（初张拉 阶段一 超张拉 补张拉...） */
            msg: ['初张拉', '阶段一', '阶段二', '终张拉'],
            /** 阶段保压时间 */
            time: [33, 33, 33, 333],
            /** 卸荷比例 */
            uploadPercentage: 15,
            /** 卸荷延时 */
            uploadDelay: 15,
            A1: { reboundMm: 3.5, wordMm: 1, theoryMm: 222 },
            A2: { reboundMm: 3.5, wordMm: 2, theoryMm: 222 },
            B1: { reboundMm: 3.5, wordMm: 3, theoryMm: 222 },
            B2: { reboundMm: 3.5, wordMm: 4, theoryMm: 222 },
          },
          /** 张拉记录 */
          record: {
            /** 张拉状态 =1一次张拉完成   =2 已张拉 */
            state: 2,
            /** 过程记录 */
            groups: [
              {
                startDate: null,
                endDate: null,
                /** 张拉阶段应力百分比 */
                knPercentage: [10, 20, 50, 100],
                /** 阶段名称 */
                msg: ['初张拉', '阶段一', '阶段二', '终张拉'],
                /** 阶段保压时间 */
                time: [1, 2, 3, 4],
                /** 卸荷比例 */
                uploadPercentage: 15,
                /** 卸荷延时 */
                uploadDelay: 15,
                /** 阶段记录 */
                A1: {
                  /** 阶段压力 */
                  mpa: [1, 2, 3, 4],
                  /** 阶段位移 */
                  mm: [4, 3, 2, 1],

                  /** 回油压力 */
                  initMpa: 1,
                  /** 回油位移 */
                  initMm: 1,
                },
                A2: {
                  /** 阶段压力 */
                  mpa: [1, 2, 3, 4],
                  /** 阶段位移 */
                  mm: [4, 3, 2, 1],
                  /** 回油压力 */
                  initMpa: 1,
                  /** 回油位移 */
                  initMm: 1,
                },
                B1: {
                  /** 阶段压力 */
                  mpa: [1, 2, 3, 4],
                  /** 阶段位移 */
                  mm: [4, 3, 2, 1],
                  /** 回油压力 */
                  initMpa: 1,
                  /** 回油位移 */
                  initMm: 1,
                },
                B2: {
                  /** 阶段压力 */
                  mpa: [1, 2, 3, 4],
                  /** 阶段位移 */
                  mm: [4, 3, 2, 1],
                  /** 回油压力 */
                  initMpa: 1.4,
                  /** 回油位移 */
                  initMm: 1.44
                },
                /** 张拉过程数据 */
                datas: {
                  ...processInit,
                  hz: 1,
                  A1: {
                    mpa: [55.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5],
                    mm: [55.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5],
                  },
                  A2: {
                    mpa: [7.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5].map(m => m * 4.5),
                    mm: [7.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5].map(m => m * 4.2),
                  },
                  B1: {
                    mpa: [4.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5].map(m => m * 3.9),
                    mm: [4.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5].map(m => m * 2),
                  },
                  B2: {
                    mpa: [9.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5].map(m => m * 3),
                    mm: [9.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5].map(m => m * 3),
                  }
                }
              }
            ]
          },
        }
      ]
    },
  ]
};


