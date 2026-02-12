import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { HomePage } from "./pages/HomePage";
import { DonatePage } from "./pages/DonatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donate" element={<DonatePage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
