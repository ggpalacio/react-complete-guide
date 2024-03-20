import { useState } from "react";
import Header from "./components/Header"
import UserInput from "./components/UserInput";
import './index.css';
import TableResult from "./components/TableResult";

function App() {
  const [userInput,setUsetInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  })

  function handleChange(field, value) {
    setUsetInput(prevState => ({
      ...prevState,
      [field]: value,
    }))
  }

  return (
    <>
      <Header />
      <UserInput value={userInput} onChange={handleChange} />
      <TableResult userInput={userInput} />
    </>
  )
}

export default App
