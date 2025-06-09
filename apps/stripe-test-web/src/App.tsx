import { useState } from 'react';
import './App.css'
const VITE_REACT_APP_PAYMENT_LINK = import.meta.env.VITE_REACT_APP_PAYMENT_LINK;

function App() {

  const [email, setEmail] = useState<string>('');

  const handleClick = () => {
    if (VITE_REACT_APP_PAYMENT_LINK) {
      window.location.href = VITE_REACT_APP_PAYMENT_LINK + '?prefilled_email=' + email
    }
  }

  return (
    <>
      <input type="email" onChange={(e) => setEmail(e.target.value)}/>
      <button onClick={handleClick}>Stripe</button>
    </>
  )
}

export default App
