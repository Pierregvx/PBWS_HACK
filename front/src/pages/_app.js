import '@/styles/globals.css'
import React from 'react';
import { AppContext } from '@/lib/AppContext';
export default function App({ Component, pageProps }) {
  const [config, setConfig] = React.useState(null);
  return (
    <AppContext.Provider value={{ config, setConfig }}>
  <Component {...pageProps} />
  </AppContext.Provider>
  
  )
}
