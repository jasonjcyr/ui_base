import styles from './AutoFitText.module.scss';

import React, { useEffect, useRef, useState } from 'react';

import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools';

interface Props {
  text: string;
  className?: string;
  testMetaData?: TestMetaData;
}

export const AutoFitText: React.FC<Props> = ({ text, className, testMetaData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const resize = () => {
      if (!containerRef.current || !textRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.scrollWidth;
      const newScale =
        containerWidth && textWidth > containerWidth ? containerWidth / textWidth : 1;
      setScale(Math.min(newScale, 1));
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [text]);

  return (
    <div ref={containerRef} className={`${styles.autofitContainer} ${className || ''}`}>
      <div
        ref={textRef}
        className={styles.autofitText}
        style={{ transform: `scale(${scale})` }}
        {...appendTestMetaData(testMetaData, 'Text')}
      >
        {text}
      </div>
    </div>
  );
};

AutoFitText.displayName = 'AutoFitText';
