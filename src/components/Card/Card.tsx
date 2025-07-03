'use client';

import clsx from 'clsx';
import styles from './Card.module.scss';
import { forwardRef } from "react";
import { Button } from '../Button';
import {ButtonProps} from '../Button/Button';
import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';

export type CardProps = {
    children: React.ReactNode;
    callToActions?: ButtonProps<'button'>[];
    heading?: React.ReactNode;
    backgroundColor?: string;
    image?:
    | {
        url: string;
        description?: string;
      }
    | undefined;
    testMetaData?: TestMetaData;
} & React.HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { 
      children,
      heading,
      backgroundColor = 'white',    
      callToActions,
      image,
      testMetaData,
    },
    ref
  ) => {

    return (
      <div ref={ref} className={clsx(styles.card)} style={{ backgroundColor }} {...testMetaData}>
        {image && (
          <div className={clsx(styles.image)}>
            <img src={image.url} alt={image.description || 'Card image'} />
          </div>
        )}
        <div className={clsx(styles.title)}><h3>{heading}</h3></div>
        <div>{children}</div>
        <div>
          {callToActions?.map((callToAction, idx) =>
            callToAction.children !== undefined
              ? <Button key={idx} {...callToAction}>{callToAction.children}</Button>
              : <Button key={idx} {...callToAction} />
          )}
        </div>
      </div>
    )
  }
);