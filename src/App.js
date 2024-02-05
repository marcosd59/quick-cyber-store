import "./App.css";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import CheckoutPage from "./components/CheckoutPage";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/checkout-page" element={<CheckoutPage />} />
          <Route path="/" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
