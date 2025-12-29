import React from 'react'
import Upload from './components/Upload'
export default function App(){ 
  return (
    <div className="app">
      <header className="site-header"><img src="/assets/logo_600x200.png" alt="By The Pound" style={{height:80}}/></header>
      <main style={{padding:20}}>
        <h1>By The Pound — Street Art</h1>
        <p>Welcome — browse the gallery or upload new pieces.</p>
        <Upload />
      </main>
    </div>
  )
}
