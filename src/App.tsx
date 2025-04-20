import { BrowserRouter, Route, Routes } from "react-router-dom"
import Store from "./Components/Store"
import Homepage from "./Components/Homepage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
