import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import ChatSection from "./pages/ChatSection";
import SavedArticle from "./pages/SavedArticle";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/chat"
              element={
                <Layout>
                  <ChatSection />
                </Layout>
              }
            />
            <Route
              path="/news"
              element={
                <Layout>
                  <News />
                </Layout>
              }
            />
            <Route
              path="/saved-article"
              element={
                <Layout>
                  <SavedArticle />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
