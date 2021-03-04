import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountDown: () => void;
  resetCountdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countDownTimeout: NodeJS.Timeout // Variável com tipagem global. Para saber o formato do countDounTimeout

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengeContext)

  
  const [time, setTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false) // verifica se o countDown está acontecendo ou não
  const [hasFinished, setHasFinished] = useState(false)

  // Math.floor para arretornar o número para baixo
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function startCountDown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countDownTimeout)
    setIsActive(false)
    setTime(0.1 * 60)
    setHasFinished(false)
  }


  // useEffect() => 1° O que eu quero executar. 2° Quando eu quero executar
  useEffect(() => { // A função será executada
    if(isActive && time > 0) {
      countDownTimeout =  setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    }else if(isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time]) // Sempre que o valor de isActive mudar
  
  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountDown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  ) 
}