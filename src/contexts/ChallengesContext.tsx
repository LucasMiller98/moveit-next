import Cookies from 'js-cookie'
import { createContext, useState, ReactNode, useEffect } from 'react' // Pesquisar
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModa'

interface Challenge {
  type: 'body' | 'eye'
  description: string,
  amount: number
}

interface ChallengeContextData {
  level: number;
  currentExperience: number; 
  challengesCompleted: number; 
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUp: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode
  level: number;
  currentExperience: number; 
  challengesCompleted: number;
}

export const ChallengeContext = createContext({} as ChallengeContextData)

export function ChellengesProvider({ 
  children, 
  ...rest
}: ChallengesProviderProps) {

  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengesCompleted, setChallengeCompleted] = useState(rest.challengesCompleted ?? 0)
  
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])
  
  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUp() {
    setIsLevelUpModalOpen(false)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()
    
    if(Notification.permission === 'granted') {
      new Notification('Novo desafio🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
    
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if(finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengeCompleted(challengesCompleted + 1)
  }
  
  return (
    <ChallengeContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengesCompleted, 
        experienceToNextLevel,
        levelUp, 
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUp
      }}
    >
      {children}

      { isLevelUpModalOpen && <LevelUpModal />} 
    </ChallengeContext.Provider>
  )
}


// if sem o else
// { isLevelUpModalOpen && <LevelUpModal />} 