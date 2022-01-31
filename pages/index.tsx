import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Card from '../components/Card'
import { CARDS } from '../brain'

const Home: NextPage = () => {

  const [selectedLink, setSelectedLink] = useState("")


  // Render cards randomly (segmented)
  const [thinking, setThinking] = useState([<></>]);
  const [working, setWorking] = useState([<></>]);
  const [aspiring, setAspiring] = useState([<></>]);

  function createBounds(row: number, col: number):Array<{left: number, right: number, top:number, bottom:number}> {
    // creates segment bounds
    let bounds: Array<{left: number, right: number, top:number, bottom:number}> = []; 

    let y_partition = window.innerHeight / row;
    let x_partition = window.innerWidth / col;

    for(let i = 0; i < row; i++) {
      for(let j = 0; j < col; j++) {
        bounds.push({
          left: (j * x_partition),
          right: ((j + 1) * x_partition) - 350,
          top: (i * y_partition),
          bottom: ((i + 1) * y_partition) - 300
        })
      }
    }

    return bounds;
  }

  function randomizedPos(upper: number, lower: number):number {
    // consideration of dimension of element itself
    //   to prevent right/bottom overflow is done at bounds level
    //   so bounds don't overlap as well

    return Math.floor(Math.random() * (upper - lower + 1) + lower);
  }

  useEffect(() => {
    // Rendering contents of each panel
    for (let i = 0; i < CARDS.length; i++) {
      /* 
        CARD[0] -> thinking
        CARDS[1] -> working
        CARDS[2] -> aspiring

        Implementation:
        1. get segment boundaries
        2. generate one item in each w/ random top/left values but bounded in segment
      */


      // panel segments; index should correspond w/ a card item
      //   but there can be more segments than cards (e.g. 5 cards in a 6 partition)
      let segment_bounds: Array<{
        left: number, 
        right: number, 
        top:number, 
        bottom:number
      }> = []; 

      // TODO if time (aka never): optimize partitioning
      if(CARDS[i].length === 1) {
        // no parition/one segment
        segment_bounds = createBounds(1, 1);
      } else if(CARDS[i].length === 2) {
        // two segments
        segment_bounds = createBounds(1, 2);
      } else if(CARDS[i].length > 2 && CARDS[i].length < 5) {
        // four segments
        segment_bounds = createBounds(2, 2);
      } else if(CARDS[i].length > 4 && CARDS[i].length < 7) {
        // six segments
        segment_bounds = createBounds(2, 3);
      } else if(CARDS[i].length > 6 && CARDS[i].length < 10) {
        // nine segments
        segment_bounds = createBounds(3, 3);
      }
      // for anything above 9 segments, draw to the panel itself
      //  -> representative of "background" memory -- less present in mind


      // at this point, we have segment bounds -- now to draw each card
      let cardsInPanel = [];
      for(let j = 0; j < CARDS[i].length; j++) {
        let top = randomizedPos(segment_bounds[j].top, segment_bounds[j].bottom);
        let left = randomizedPos(segment_bounds[j].right, segment_bounds[j].left);
        cardsInPanel.push(
          <Card 
            key={top}
            top={top}
            left={left}
            category={CARDS[i][j].category}
            title={CARDS[i][j].title}
            date={CARDS[i][j].date}
            content={CARDS[i][j].content}
            link={CARDS[i][j].link}
            linkText={CARDS[i][j].linkText}
            special={CARDS[i][j].isSpecial} />
        )
      }

      if(i === 0) {
        // if thinking panel
        setThinking(cardsInPanel);
      } else if (i === 1) {
        // if working panel
        setWorking(cardsInPanel);
      } else if (i === 2) {
        // if aspiring panel
        setAspiring(cardsInPanel);
      }

    }
  }, [])

  return (
    <div>
      <Head>
        <title>jaewu</title>
        <meta name="description" content="on the net" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div className={styles.choose}>
          <span className={styles.textTransparent}>learn about the</span>
          <ul className={styles.choices}
              style={{
                marginTop: selectedLink == "aspirational" ? "-35%" : selectedLink == "human" ? "0" :  "-18%"
              }} >
            <li 
              className={styles.choice} 
              style={{ opacity: selectedLink !== "human" ? "0.3" : "1" }}
              onClick={()=>setSelectedLink("human")}>
              thinking
            </li>
            <li 
              className={styles.choice}
              style={{ opacity: selectedLink !== "working" ? "0.3" : "1" }}
              onClick={()=>setSelectedLink("working")}>
              working
            </li>
            <li 
              className={styles.choice} 
              style={{ opacity: selectedLink !== "aspirational" ? "0.3" : "1" }}
              onClick={()=>setSelectedLink("aspirational")}>
              aspiring
            </li>
          </ul>
          <span className={styles.textTransparent}>jaewu</span>
        </div>

        <div className={styles.planes}
          style={{
            marginTop: `${ selectedLink ? selectedLink == "aspirational" ? "-300vh" : selectedLink == "human" ? "-100vh" :  "-200vh" : "0" }`
          }}>
          <div className={styles.plane}>
              <div style={{width: "100%", height: "100%", background: "white"}}></div>
          </div>
          <div className={styles.plane}>
            {thinking}
          </div>
          <div className={styles.plane}>
            {working}
          </div>
          <div className={styles.plane}>
            {aspiring}
          </div>
        </div>        
      </div>
    </div>
  )
}

export default Home
