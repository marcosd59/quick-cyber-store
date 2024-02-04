import { Check } from "@mui/icons-material";
import "./App.css";
import NavBar from "./components/NavBar";
// import ProductCard from "./components/ProductCard";
// import Products from "./components/Products";
import CheckoutPage from "./components/CheckoutPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <Products /> */}
      {/* <ProductCard /> */}
      <CheckoutPage />
    </div>
  );
}

export default App;
