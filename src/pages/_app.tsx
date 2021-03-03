// Para reaproveitar uma estrutura previa da aplicação. Para coisas fixas, ou seja, que não mudam nas outras páginas. Tudo que vai se repetir em todas as paginas.
import { ChellengesProvider } from '../contexts/ChallengesContext'

import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  
  return(
    <ChellengesProvider>
      <Component {...pageProps} />
    </ChellengesProvider>
  )
}

export default MyApp

// Provider -> Todos os elementos em provider, terão acesso aos dados do contexto