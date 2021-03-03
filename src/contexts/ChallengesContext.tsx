import { findSourceMap } from 'module'
import { createContext, useState, ReactNode, useEffect } from 'react' // Pesquisar
import challenges from '../../challenges.json'

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
}

interface ChallengesProviderProps {
  children: ReactNode
}

export const ChallengeContext = createContext({} as ChallengeContextData)

export function ChellengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengeCompleted] = useState(0)
  
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])
  
  function levelUp() {
    setLevel(level + 1)
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
        completeChallenge
      }}
    >
      {children}
    </ChallengeContext.Provider>
  )
}

