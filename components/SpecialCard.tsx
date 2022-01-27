import Image from 'next/image';
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

const SpecialCard = (props: any) => {

  const { top, left, right, bottom, title, content } = props;

  return (
    <div className={styles.specialCard}
      style={{
          top: top ? top : "auto",
          left: left ? left : "auto",
          right: right ? right : "auto",
          bottom: bottom ? bottom : "auto"
      }}>
      <div className={styles.specialCardInner}>
          <h3>
            about
          </h3>
          <h2>
          {title}
          </h2>
          <p>
          {content}
          </p>
      </div>
    </div>
  )
}

export default SpecialCard
