import Image from 'next/image';
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'

const Card = (props: any) => {

  // Chase function

  // For info about card
  const ref = useRef<HTMLHeadingElement>(null);
  const [elWidth, setElWidth] = useState(0);
  const [elHeight, setElHeight] = useState(0);

  useEffect(() => {
    setElWidth(ref.current ? ref.current.offsetWidth : 0);
    setElHeight(ref.current ? ref.current.offsetHeight : 0);
  }, [])

  // hover state (to determine which state gets used as top/left value)
  const [hovered, setHovered] = useState(false);
  const [dTop, setDTop] = useState(0);
  const [dLeft, setDLeft] = useState(0);

  // For positioning card
  const [top, setTop] = useState(props.top)
  const [left, setLeft] = useState(props.left)

  const updateMousePos = (e: any) => {
    // Positioning of centre of card
    let ctrX = (elWidth / 2) + left; 
    let ctrY = (elHeight / 2) + top;

    // get difference between centre and mouse pos
    let dx = ctrX - e.screenX; // pos value = cursor above
    let dy = ctrY - e.screenY + 50; // pos value = cursor left
    // TODO: problem - for some reason the Y value is off (adding 50 approximates closely enough to centre)

    const intensity = 0.1;

    let newTop = top - (dy * intensity);
    let newLeft = left - (dx * intensity);

    setDTop(newTop)
    setDLeft(newLeft)
  }



  // Card data
  const { category, title, date, content, link, linkText, special } = props;
  const [popup, setPopup] = useState(false);

  return (
    <>
      <div className={styles.popupBackground} style={{display: popup ? "flex" : "none"}}>
        <div className={styles.popupBox}>
          <h3>
            {category}
          </h3>
          <h2>
            {title}
          </h2>
          <p dangerouslySetInnerHTML={{__html: content}}>
          </p>
        </div>
        <div className={styles.popupClose} onClick={()=>setPopup(false)}>
          close
          <span style={{display: "flex", alignItems: "center", userSelect: "none", paddingLeft: "0.2em"}}>
            <Image src="/assets/x.svg" alt="link" width={14} height={14} />
          </span>
        </div>
      </div>
      <div 
        ref={ref}
        onMouseEnter={()=>setHovered(true)}
        onMouseMove={e=>updateMousePos(e)}
        onMouseLeave={()=>{setTop(props.top); setLeft(props.left);setHovered(false)}}
        className={styles.card}
        id={special ? "rainbow" : ""}
        style={{
          // Chase styles
          transition: hovered ? "none" : "0.2s all cubic-bezier(0.165, 0.84, 0.44, 1)",
          top: hovered ? dTop : top,
          left: hovered ? dLeft : left,

          // Special styles
          border: special ? "none" : "1px solid #EEEEEE",
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
          { linkText && !link && (
            <div className={styles.link} onClick={()=>setPopup(true)}>
              {linkText}
              <span style={{display: "flex", alignItems: "center", userSelect: "none"}}>
                <Image src="/assets/arrow-right.svg" alt="link" width={16} height={16} />
              </span>
            </div>
          ) }
          { linkText && link && (
            <Link href={link} passHref>
              <a className={styles.link}>
                {linkText}
                <span style={{display: "flex", alignItems: "center", userSelect: "none"}}>
                  <Image src="/assets/arrow-right.svg" alt="link" width={16} height={16} />
                </span>
              </a>
            </Link>
          )}
      </div>
    </>
  )
}

export default Card
