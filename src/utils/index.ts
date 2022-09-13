// s 是 区间[a1, a2] 的值
// 返回 s map 映射到 [b1, b2] 后的值
export const map = (s: number, a1: number, a2: number, b1: number, b2: number) => {
  return ((s - a1) / (a2 - a1)) * (b2 - b1) + b1;
};

const isWindow = (obj: any) => {
  const toString = Object.prototype.toString.call(obj);
  return toString === '[object global]' || toString === '[object Window]' || toString === '[object DOMWindow]';
};

export const scrollTop = (ele: any, target?: number) => {
  const isWin = isWindow(ele);
  const y =
    window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollTop;

  if (typeof target === 'number' && !isNaN(target)) {
    if (isWin) {
      document.documentElement.scrollTop = target;
      document.body.scrollTop = target;
    } else {
      ele.scrollTop = target;
    }
  }

  return isWin ? y : ele.scrollTop;
};

export const toFixed = (num: number, length?: number) => {
  const _rnd = length ? Math.pow(10, length) : 100000;
  const n = num | 0;
  const dec = num - n;
  let fixed = num + '';
  if (dec) {
    const r = ((dec * _rnd + (num < 0 ? -0.5 : 0.5)) | 0) / _rnd;
    const t = r | 0;
    const str = r.toString();
    const decStr = str.split('.')[1] || '';
    fixed = `${num < 0 && !(n + t) ? '-' : ''}${n + t}.${decStr}`;
  }
  return parseFloat(fixed);
};

export const scrollGate = (callback: Function) => {
  let before = 0;

  return () => {
    const current = scrollTop(window);
    const delta = current - before;
    if (delta >= 0) {
      callback && callback('positive');
    } else {
      callback && callback('reverse');
    }

    before = current;
  };
};
