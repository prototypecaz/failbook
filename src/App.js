import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useContext} from "react";
import { AuthContext } from "./context/AuthContext";
import DashBoard from "./Components/DashBoard";
import Accueil from "./Components/Accueil";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Routes>
      {currentUser ? (
        <Route path="/*" element={<DashBoard />} />
      ) : (
        <Route path="/*" element={<Accueil />}></Route>
      )}
    </Routes>
  );
}

export default App;
