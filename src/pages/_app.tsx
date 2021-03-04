// Para reaproveitar uma estrutura previa da aplicação. Para coisas fixas, ou seja, que não mudam nas outras páginas. Tudo que vai se repetir em todas as paginas.
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  
  return(
    <Component {...pageProps} />
  )
}

export default MyApp

// Provider -> Todos os elementos em provider, terão acesso aos dados do contexto