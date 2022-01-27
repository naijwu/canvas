import Image from 'next/image';
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

const Card = (props: any) => {

  const { top, left, right, bottom, category, title, date, content, link, linkText } = props;

  return (
    <>
      <div className={styles.card}
        style={{
          top: top ? top : "auto",
          left: left ? left : "auto",
          right: right ? right : "auto",
          bottom: bottom ? bottom : "auto"
        }}>
          <h3>
          {category}
          </h3>
          <h2>
          {title}
          </h2>
          {date && (
          <h3 style={{color:"#1F78FF"}}>
          {date}
          </h3>
          )}
          <p>
          {content}
          </p>
          { (link || linkText) && (
          <Link href={link} passHref>
            <a className={styles.link}>
              {linkText}
              <span style={{display: "flex", alignItems: "center", userSelect: "none"}}>
                <Image src="/assets/arrow-right.svg" alt="link" width={16} height={16} />
              </span>
            </a>
          </Link>
          ) }
      </div>
    </>
  )
}

export default Card
