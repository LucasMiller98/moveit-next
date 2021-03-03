// Home page
import Head from 'next/head'
import styles from '../styles/pages/Home.module.css'
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';

export default function Home() {
  
  return (
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
  )
}

// CSS modules é uma forma de conseguir fazer com que um CSS só esteja desponivel pra um único componente, para ele nunca acessar o restante dos componentes de outra aplicação