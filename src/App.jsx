
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Coins from "./pages/Coins"
import { makeStyles } from "@material-ui/core"
import CryptoContext from "./CryptoContext"
import Carousel from "./components/Banner/Carousel"



const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));
function App() {
  const classes = useStyles();

  return (
    <>
    <CryptoContext>
      <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/coins/:id" element={<Coins />} />
          <Route path="/abc" element={<Carousel />} />
          
          <Route path="/*" element={<h1>Did Not Found</h1>}/>
        </Routes>
        </div>
      </BrowserRouter>
      </CryptoContext>
    </>
  )
}

export default App



