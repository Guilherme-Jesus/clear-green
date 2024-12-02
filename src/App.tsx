import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Adicione outras rotas aqui conforme necessário */}
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
