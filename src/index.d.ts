/** 弹窗配置项 */
interface DialogOptions {
  content?: string;
  title?: string;
  width?: string;
  height?: string;
  /** 遮罩层：true=显示, false=无, 0~1=透明度 */
  shadow?: boolean | number;
  /** 点击遮罩关闭 */
  shadowClose?: boolean;
  /** 显示关闭按钮 */
  showClose?: boolean;
  /** 自动关闭秒数（0=不自动关闭） */
  time?: number;
  /** 偏移量 e.g. ["100px","50%"] */
  offset?: [string, string];
  skin?: string;
  className?: string;
  extend?: boolean;
  ani?: string;
  uniqueId?: string;
  before?: (el: HTMLElement) => void;
  after?: (el: HTMLElement) => void;
  success?: (id: string, el: HTMLElement) => void;
}

/** alert 确认/取消配置 */
interface AlertExtend {
  confirmText?: string;
  confirmSkin?: string;
  confirm?: (id: string, btn: HTMLElement) => void;
  cancelText?: string;
  cancelSkin?: string;
  cancel?: (id: string, btn: HTMLElement) => void;
}

/** 图片信息 */
interface ImageInfo {
  width: number;
  height: number;
  size: number;
  MB: number;
  name: string;
  type: string;
}

/** 头像上传配置 */
interface UploadAvatarOptions {
  title?: string;
  desc?: string;
  btnClass?: string;
  /** 读取图片后回调，返回 false 可阻断进入画布 */
  change?: (info: ImageInfo) => boolean;
  /** 裁剪完成回调，base64: png 格式 */
  success?: (base64: string, id: string) => void;
}

/** 菜单项 */
interface DropdownItem {
  label: string;
  value: string;
  disabled?: boolean;
  border?: boolean;
  children?: DropdownItem[];
}

/** 弹出层配置 */
interface PopoverOptions {
  el: HTMLElement;
  list: DropdownItem[];
  success?: (value: { label: string; value: string }) => void;
  offset?: [string, string];
  skin?: string;
  value?: string;
}

/** 拖拽事件配置 */
interface MoveEventOptions {
  el: HTMLElement;
  doc?: Document;
  success: (offset: { left: number; top: number }) => { left: number; top: number };
}

declare const shaonq: {
  version: string;

  /** 客户端检测 */
  is: {
    android: boolean;
    /** IE 版本号 | false */
    ie: string | false;
    ios: boolean;
    wechat: boolean;
  };

  /** 常用正则 */
  regexp: {
    mobile: RegExp;
    email: RegExp;
    required: RegExp;
    url: RegExp;
    image: RegExp;
  };

  /** Cookie 操作 */
  cookie: {
    set(name: string, value: any, domain?: string, path?: string, expires?: number, is?: boolean): void;
    get(name: string, defaultValue?: any): string;
    clear(name: string, path?: string, domain?: string): void;
  };

  /** sessionStorage 封装（自动 JSON 序列化） */
  session: {
    set(name: string, value: any): void;
    get(name: string): any;
    clear(name: string): void;
  };

  /** localStorage 封装（自动 JSON 序列化） */
  store: {
    set(name: string, value: any): void;
    get(name: string): any;
    clear(name: string): void;
  };

  /** DOM 工具 */
  dom: {
    /** IE 版本号（0=非IE） */
    ie: number;
    on(element: Element, event: string, handler: EventListenerOrEventListenerObject): void;
    off(element: Element, event: string, handler?: EventListenerOrEventListenerObject): void;
    once(el: Element, event: string, fn: EventListener): void;
    /** 元素位置信息（含 scroll 偏移） */
    position(el: Element): {
      top: number;
      left: number;
      height: number;
      width: number;
      pageYOffset: number;
      pageXOffset: number;
    };
    el(attr: string, doc?: Document | Element): Element | null;
    els(attr: string, doc?: Document | Element): Element[];
    hasClass(el: Element, cls: string): boolean;
    addClass(el: Element, cls: string): void;
    removeClass(el: Element, cls: string): void;
    append(el: Element, doc?: Element): void;
    remove(el: Element): void;
    isHTMLElement(node: any): boolean;
    getScrollParent(node: Element): Element | Window;
    setTransform(node: Element, vale: string): string | undefined;
  };

  /** 日期工具。默认格式 yyyy-MM-dd */
  date: {
    /** 格式化日期。@param date - Date/时间戳/日期字符串 */
    format(date: string | number | Date, format?: string): string;
    toString(date: string | number | Date, format?: string): string;
    toDate(date: string | number | Date): Date;
    getMonthDays(date: Date, month?: number): number;
    addDays(n: number, date?: string, format?: string): string;
    addMonths(n: number, date?: string, format?: string): string;
    addMonthsForStart(n: number, date?: string): string;
    addMonthsForEnd(n: number, date?: string): string;
    addYears(n: number, date?: string, format?: string): string;
    addYearsForStart(n: number, date?: string): string;
    addYearsForEnd(n: number, date?: string): string;
    sunOfWeek(date?: string, format?: string): string;
    monOfWeek(date?: string, format?: string): string;
    tueOfWeek(date?: string, format?: string): string;
    wedOfWeek(date?: string, format?: string): string;
    turOfWeek(date?: string, format?: string): string;
    friOfWeek(date?: string, format?: string): string;
    satOfWeek(date?: string, format?: string): string;
    firstDayOfMonth(date?: string, format?: string): string;
    lastDayOfMonth(date?: string): string;
    firstDayOfYear(date?: string, format?: string): string;
    lastDayOfYear(date?: string, format?: string): string;
    /** @example shaonq.date.today() // "2026-05-26" */
    today(format?: string): string;
  };

  /** 动态加载 JS。@example await shaonq.loadJs("https://cdn.jsdelivr.net/npm/vue") */
  loadJs: (src: string) => Promise<void>;

  /** 动态加载 CSS。@example shaonq.loadCss("https://cdn.example.com/style.css", "my-css") */
  loadCss: (src: string, id?: string) => void;

  /** 生成唯一 ID。@example shaonq.uniqueId("U") // "U000001" */
  uniqueId: (before?: string) => string;

  /** 刷新弹窗位置（居中） */
  refreshOffset: (el: HTMLElement, offset?: [string, string]) => void;

  /** 关闭弹窗。不传 id 关闭所有 */
  hideToast: (id?: string) => void;

  /** 提示消息（自动关闭）。@example shaonq.toast("保存成功") */
  toast: (content: string, time?: number) => string;

  /** Loading 弹窗。@example shaonq.showLoading("处理中...") */
  showLoading: (content: string) => string;

  /** 成功提示。@example shaonq.showSuccess("操作成功") */
  showSuccess: (content: string, time?: number) => string;

  /** 确认弹窗。@example shaonq.alert("确定删除？", { confirm: (id) => delUser() }) */
  alert: (content: string | DialogOptions, extend?: AlertExtend) => string;

  /** 附近提示（轻量，2秒自动关闭）。@example shaonq.showNearby({ content:"已复制", offset:["10px","auto"] }) */
  showNearby: (options: DialogOptions) => string;

  /** 模态框。@example shaonq.showModal("Hello") */
  showModal: (options: string | DialogOptions) => string;

  /** Popover 弹出。@example shaonq.showPopover({ el: btn, list:[{label:"编辑",value:"edit"}] }) */
  showPopover: (options: PopoverOptions) => string;

  /** 下拉菜单。@example shaonq.showDropdown({ el: btn, list:[{label:"男",value:"male"},{label:"女",value:"female"}], success:({label,value})=>{} }) */
  showDropdown: (options: PopoverOptions) => string;

  /** 右键菜单。@example shaonq.showContextMenu({ el: target, list:[{label:"复制",value:"copy"}] }) */
  showContextMenu: (options: PopoverOptions) => string;

  /** 头像上传（裁剪）。@example shaonq.uploadAvatar({ success: (base64) => img.src = base64 }) */
  uploadAvatar: (options?: UploadAvatarOptions) => void;

  /** 拖拽事件。@example shaonq.moveEvent({ el: box, success: ({left,top})=> box.style.transform = \`translate(${left}px,${top}px)\` }) */
  moveEvent: (options: MoveEventOptions) => void;

  /** 图片查看器。@example shaonq.showImageView(document.querySelector("img")) */
  showImageView: (node: HTMLImageElement) => void;

  /** JSON 序列化（安全）。@example shaonq.stringify({a:1}) // "{"a":1}" */
  stringify: (val: any) => string;

  /** JSON 解析（安全）。@example shaonq.parse('{"a":1}') // {a:1} */
  parse: (val: string) => any;

  /** 深克隆。@example shaonq.clone({a:{b:1}}) // {a:{b:1}} */
  clone: (val: any) => any;

  /** 数字转百分比。@example shaonq.toPercent(0.0567) // "5.67%" */
  toPercent: (a: number | string) => string;

  /** 数字千分位。@example shaonq.toThousands(1234567) // "1,234,567" */
  toThousands: (val: number | string) => string;

  /** 字节转可读大小。@example shaonq.toMB(2048) // "2.00KB" */
  toMB: (bytes: number) => string;

  /** 安全设置深层属性（类似 lodash.set）。@example shaonq.setData({}, 'a[0].b.c', 1) // {a:[{b:{c:1}}]} */
  setData: (object: any, path: string | string[], defaultValue: any) => any;

  /** 深合并（类似 lodash.merge）。@example shaonq.merge({a:{b:1}}, {a:{c:2}}) // {a:{b:1,c:2}} */
  merge: (object: any, source?: any) => any;
};
export default shaonq;
