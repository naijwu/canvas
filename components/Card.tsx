import Image from 'next/image';
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'

const Card = (props: any) => {

  // For info about card
  const ref = useRef<HTMLHeadingElement>(null);
  const [elWidth, setElWidth] = useState(0);
  const [elHeight, setElHeight] = useState(0);

  useEffect(() => {
    setElWidth(ref.current ? ref.current.offsetWidth : 0);
    setElHeight(ref.current ? ref.current.offsetHeight : 0);
  }, [])

  // For mouse position
  const [X, setX] = useState(0);
  const [Y, setY] = useState(0);

  // For positioning card
  const [top, setTop] = useState(props.top ? props.top : 0)
  const [left, setLeft] = useState(props.left ? props.left : 0)

  // Card data
  const { category, title, date, content, link, linkText } = props;

  const updateMousePos = (e: any) => {
    setX(e.screenX);
    setY(e.screenY);

    // convert top/left string (vw) to integer (pixels)
    let leftPx = (left.split('').slice(0, -2).join('') * window.innerWidth) / 100;
    let topPx = (top.split('').slice(0, -2).join('') * window.innerHeight) / 100;

    // Positioning of centre of card
    let ctrX = (elWidth / 2) + leftPx; 
    let ctrY = (elHeight / 2) + topPx;

    // get difference between centre and mouse pos
    let dx = ctrX - X; // pos value = cursor above
    let dy = ctrY - Y + 50; // pos value = cursor left
    // TODO: problem - for some reason the Y value is off (adding 50 approximates closely enough to centre)

    const intensity = 0.3;

    // TODO: These values will be applied to transform: translateX and translateY to the card--
    console.log(dx * intensity, dy * intensity)
  }

  return (
    <>
      <div 
        ref={ref}
        onMouseMove={e=>updateMousePos(e)}
        className={styles.card}
        style={{
          top: top ? top : "auto",
          left: left ? left : "auto",
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
