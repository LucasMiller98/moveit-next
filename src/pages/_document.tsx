import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        {/* Tudo o que for colocado no Head vai aparecer no Head na aplicação */}
        <Head>

          <link rel="shortcut icon" href="favicon.png" type="image/png"/>
          
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
        </Head>
        <body> 
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

          {/* NextScript -> scripts que o next injeta na app automaticamente */}
          {/* Main -> vai mostrar a aplicação */}
          {/* Tudo o que for colocado no Head vai aparecer no Head na aplicação */}
          // Colocamos tudo no document pq recarrega tudo de uma vez na vizita da aplicação
