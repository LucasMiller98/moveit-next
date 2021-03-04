// Home page
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import styles from '../styles/pages/Home.module.css'
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChellengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExperience: number; 
  challengesCompleted: number;
}

export default function Home(props) {

  
  return (
    <ChellengesProvider 
      level={props.level}
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              {/* Component */}
              <Profile /> 
              <CompletedChallenges />
              <CountDown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChellengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = {
    level: 1,
    currentExperience: 50,
    challengesCompleted: 2,
  }

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies
  
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}

// CSS modules é uma forma de conseguir fazer com que um CSS só esteja desponivel pra um único componente, para ele nunca acessar o restante dos componentes de outra aplicação