import { TestMetaData } from '@/interfaceCollection';
import styles from './NavigationBar.module.scss';

import React, { FC } from 'react';
import clsx from 'clsx'; 
import { appendTestMetaData } from '@/tools';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavBarProps {
  links: NavLink[];
  logo?: string;
  classname?: string;
  testMetaData?: TestMetaData;
}

export const NavigationBar: FC<NavBarProps> = ({ links, logo, testMetaData, classname}) => {
  const meta = appendTestMetaData(testMetaData, 'nav-bar');
  const linkTestMetaData = appendTestMetaData(testMetaData, 'link');

  function generateLinkTestMetaData(item: string){
    return appendTestMetaData(testMetaData, item)
  }
  
  return <nav className={clsx(styles.navContainer, classname)} {...meta}>
    <div className={styles.imgContainer}>
      <img src={logo} className={styles.logo}/>
    </div>
    <div className={styles.navLinks}>
      <ul className={styles.navUl} {...linkTestMetaData}>
        {
          links.map((link, index)=>{
            return<>
             <li className={styles.navlink} key={index} {...generateLinkTestMetaData(link.label)}>
              <a href={link.href}>{link.label}</a>
            </li>
            </>
          })
        }
      </ul>
    </div>
  </nav>;
};
