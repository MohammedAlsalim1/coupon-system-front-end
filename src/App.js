import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import Home from "./pages/Home/Home";
import User from "./Components/user/User";

function App() {
  //const token = useSelector(state => state.auth.token)

  return (
    <>
    {/*<Routes>*/}
    {/*  <Route path="/" element={token ? <Navigate to="/home"/> : <Navigate to="/login"/>}/>*/}
    {/*  <Route path="/home" element={token ? <Home/> : <Navigate to="/login"/>}/>*/}
    {/*  <Route path="/login" element={<User/>}/>*/}
    {/*</Routes>*/}
      <User/>

    </>
  );
}

export default App;
