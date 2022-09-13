import { map, scrollTop, scrollGate, toFixed } from '@/utils';
import React, { useRef, useLayoutEffect } from 'react';
import './style/ScrollDrive.scss';

enum AnimationStatus {
  START = 'start',
  RUNNING = 'running',
  END = 'END',
}

enum Direction {
  POSITIVE = 'positive',
  REVERSE = 'reverse',
}

export default function ScrollDrive() {
  const componentRef = useRef({
    animationList: [
      { key: 'left', defaultVal: 100, currentVal: 100, targetVal: 800, startTime: 0, duration: 2000 },
      { key: 'opacity', defaultVal: 0.5, currentVal: 0.5, targetVal: 1, startTime: 1000, duration: 1000 },
      { key: 'rotateX', defaultVal: 0, currentVal: 1, targetVal: 270, startTime: 2000, duration: 1000 },
      { key: 'rotateY', defaultVal: 0, currentVal: 1, targetVal: 180, startTime: 2000, duration: 1000 },
    ],
    status: AnimationStatus.START,
    currentTime: 0,
    endTime: 0,
    reverse: false,
    target: {} as HTMLElement,
  });

  const ref = componentRef.current;

  const myLinear = (t1: number, t2: number, s1: number, s2: number) => {
    const s = s2 - s1;
    return (s / t2) * t1 + s1;
  };

  const myRender = () => {
    if (ref.status === AnimationStatus.START) {
      ref.currentTime = 0;
    }

    if (ref.status === AnimationStatus.RUNNING) {
      ref.currentTime = Math.max(
        map(scrollTop(window), 0, document.body.scrollHeight - window.innerHeight, 0, ref.endTime),
        0
      );
    }

    if (ref.status === AnimationStatus.END) {
      ref.currentTime = ref.endTime;
    }

    ref.animationList.forEach((item) => {
      const { defaultVal, targetVal, startTime, duration } = item;

      // 正向运动
      if (ref.currentTime >= startTime && ref.currentTime <= startTime + duration) {
        let val = myLinear(ref.currentTime - startTime, duration, defaultVal, targetVal);
        item.currentVal = toFixed(val);
      }

      if (ref.currentTime < startTime) {
        item.currentVal = defaultVal;
      }
    });

    ref.target.style.left = ref.animationList[0].currentVal + 'px';
    ref.target.style.opacity = `${ref.animationList[1].currentVal}`;
    ref.target.style.transform = `rotateX(${ref.animationList[2].currentVal}deg) rotateY(${ref.animationList[3].currentVal}deg)`;
  };

  const myScrollHandler = (direction: string) => {
    if (direction === Direction.POSITIVE) {
      ref.reverse = false;
      ref.status = ref.currentTime < ref.endTime ? AnimationStatus.RUNNING : AnimationStatus.END;
    }

    if (direction === Direction.REVERSE) {
      ref.reverse = true;
      ref.status = ref.currentTime > 0 ? AnimationStatus.RUNNING : AnimationStatus.START;
    }

    window.requestAnimationFrame(myRender);
  };

  useLayoutEffect(() => {
    const box = document.querySelector('#box') as HTMLElement;
    ref.target = box;
    // 计算全部时间线的总endTime
    ref.animationList.forEach((item) => {
      const { duration, startTime } = item;
      ref.endTime = Math.max(duration + startTime, ref.endTime);
    });

    const scrollHandler = scrollGate(myScrollHandler);

    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <div className="container">
      <div id="box" className="box"></div>
    </div>
  );
}
