import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";
import { DonatePage } from "./pages/DonatePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/donate"      element={<DonatePage />} />
        <Route path="/privacy"     element={<PrivacyPolicyPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="*"            element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
