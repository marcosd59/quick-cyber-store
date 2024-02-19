import "./App.css";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import CheckoutPage from "./components/CheckoutPage";
import { useStateValue } from "./StateProvider";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import { useEffect } from "react";
import { auth } from "./firebase";
import { actionTypes } from "./reducer";
import Checkout from "./components/checkoutform/Checkout";

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      console.log(authUser);
      if (authUser){
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        })
      }
    })
  },[])

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/checkout-page" element={<CheckoutPage />} />
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
