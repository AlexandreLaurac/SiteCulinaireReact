import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Recettes from "./components/Recettes";
import Blog from "./components/Blog";
import './style.css'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<Recettes />} />
          <Route path="blog" element={<Blog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
