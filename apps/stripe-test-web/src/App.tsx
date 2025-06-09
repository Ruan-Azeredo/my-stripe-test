import './App.css'
const VITE_REACT_APP_PAYMENT_LINK = import.meta.env.VITE_REACT_APP_PAYMENT_LINK;

function App() {

  const handleClick = () => {
    if (VITE_REACT_APP_PAYMENT_LINK) {
      window.location.href = VITE_REACT_APP_PAYMENT_LINK;
    }
  }

  return (
    <>
      <button onClick={handleClick}>Stripe</button>
    </>
  )
}

export default App
