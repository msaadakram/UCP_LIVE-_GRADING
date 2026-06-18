import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { HomePage } from "./pages/HomePage";
import { DonatePage } from "./pages/DonatePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
