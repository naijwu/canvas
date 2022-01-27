import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Card from '../components/Card'
import SpecialCard from '../components/SpecialCard'

const Home: NextPage = () => {

  const [selectedLink, setSelectedLink] = useState("")

  useEffect(() => {
    
  }, [selectedLink])

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
            <Card 
             top="10vh"
             left="10%"
             category="writing"
             title="Ideas that have me"
             content="you&apos;ve heard about whether an idea
             is someone or another persons, and also
             the idea that no ideal is truly original. well
             i don&apos;t find that as interesting as how we 
             dont posess those ideas--regardless of 
             where it originates--instead they possess
             us. here are some ideas that have 
             significantly impacted the way I live"
             link=""
             linkText="read more"
            />

            <Card 
             top="14vh"
             left="40vw"
             category="fact"
             title="favourite food"
             content="my fav food is chicken breast"
            />

            <Card 
             bottom="20vh"
             left="20vw"
             category="writing"
             title="values I value"
             content="you&apos;ve heard about whether an idea
             is someone or another persons, and also
             the idea that no ideal is truly original. well
             i don&apos;t find that as interesting as how we 
             dont posess those ideas--regardless of 
             where it originates--instead they possess
             us. here are some ideas that have 
             significantly impacted the way I live"
             link=""
             linkText="read more"
            />

            <SpecialCard
             top="35vh"
             right="20vw"
             title="learn about the thinking jaewu"
             content="This section is my digital garden, WIP" />
            
          </div>
          <div className={styles.plane}>
            {/* working */}
            <Card 
              top="10vh"
              left="18vw"
              category="past experience"
              title="developer @ nwPlus"
              date="October 23, 2001 - Present"
              content="designs and programs w/ Figma and
              React/NextJS. Collaborate with GitHub"
              link="https://nwplus.io"
              linkText="nwPlus website"
            />

            <Card 
              top="37vh"
              left="10vw"
              category="past experience"
              title="developer @ UBC BizTech"
              date="October 23, 2001 - Present"
              content="designs and programs w/ Figma and
              React/NextJS. Collaborate with GitHub"
              link="https://ubcbiztech.com"
              linkText="BizTech website"
            />

            <Card 
              top="19vh"
              right="40vw"
              category="project"
              title="jaewuchun.com"
              content="all data pulls from a central database. 
              created in NextJS, hosted on Vercel.
              I struggled with this question: what is the 
              purpose for this website, and why?"
              link="/"
              linkText="read more"
            />

            <Card 
              bottom="15vh"
              left="15vw"
              category="project"
              title="wordseveryday.net"
              content="you’ve heard about whether an idea
              is someone or another persons, and also
              the idea that no ideal is truly original. well
              i don’t find that as "
              link="https://wordseveryday.net"
              linkText="visit site"
            />

            <Card 
              bottom="23vh"
              left="40vw"
              category="project"
              title="internetspace.co"
              content="you’ve heard about whether an idea
              is someone or another persons, and also
              the idea that no ideal is truly original. well
              i don’t find that as "
              link="https://internetspace.co"
              linkText="visit site"
            />

            <Card 
              bottom="19vh"
              right="20vw"
              category="project"
              title="opengavel.app"
              content="you’ve heard about whether an idea
              is someone or another persons, and also
              the idea that no ideal is truly original. well
              i don’t find that as "
              link="https://opengavel.app"
              linkText="visit site"
            />

            <Card 
              top="12vh"
              right="14vw"
              category="cv"
              title="resume/cv"
              link="https://jaewuchun.com/cv.pdf"
              linkText="open pdf"
            />

            <SpecialCard
              top="35vh"
              right="10vw"
              title="learn about the working jaewu"
              content="Professional experience &amp; projects;
              Anything I spend energy on" />
          </div>
          <div className={styles.plane}>
            {/* aspirational */}

            <SpecialCard
              top="30vh"
              left="10vw"
              title="learn about the aspiring jaewu"
              content="goal-tracking, next-steps, chief-ends 
              I'm working towards" />
          </div>
        </div>        
      </div>
    </div>
  )
}

export default Home
