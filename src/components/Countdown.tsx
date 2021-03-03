// useEffect -> função para disparar efeitos colaterais. Para quando algo mudar.

import { useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'


export function CountDown() {
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    startCountDown, 
    resetCountdown 
  } = useContext(CountdownContext)

  // A contagem inicia com 25, quando for converter para String(), ele vai para '25' e o split() reparte os números e transforma em um array como a primeira posição

  // padStart(2, '0'), verifica se a string não tiver 2 caracteres, ele vai preencher o restante para a esquerda com zero.

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')
  
  return(
    <div>
      <div className={styles.CountdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button 
          disabled 
          className={styles.countDownButton}
      >
        Ciclo encerrado
      </button>
      ) : (
        <>
          {/* Se o retorno tiver mais de uma linha, colocamos parênteses. */}
          { isActive ? (
            <button 
              onClick={resetCountdown} 
              type="button" 
              className={styles.countDownButton}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button 
              onClick={startCountDown} 
              type="button" 
              className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
            >
              Iniciar ciclo
          </button>
          ) }
        </>
      )}

    </div>
  )
}