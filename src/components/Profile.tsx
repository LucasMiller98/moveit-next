import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
  const { level } = useContext(ChallengeContext)
  
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/LucasMiller98.png" alt="Lucas Miller"/>
      <div>
        <strong>Lucas Miller</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}