import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login/Login";
import Footer from "./components/Footer";
import Signup from "./auth/Signup/Signup";
import { User } from "./interfaces/User";
import HomePage from "./pages/Homepage/Homepage";
import Edit from "./pages/Edit";
import CreateCard from "./pages/CreateCard";
import { createContext, useState } from "react";
import AdminGuard from "./auth/AdminGuard";
import SandBox from "./pages/SANDBOX/SandBox";
import {
  deleteCard,
  getCardByUser,
  getCards,
  verifyToken,
} from "./services/ApiService";
import BusinessPage from "./pages/BusinessPage/BusinessPage";
import MyCards from "./pages/MyCards/MyCards";
import FavCards from "./pages/FavCards";
import AboutPage from "./pages/About/AboutPage";
import EditUser from "./pages/EditUser/EditUser";
import { CardProps } from "./interfaces/Card";

interface Context {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  fetchUser: () => void;
}

export const AppContext = createContext<Context>({
  user: undefined,
  setUser: () => {},
  fetchUser: () => {},
});

function App() {
  const [user, setUser] = useState<User>();
  const [theme, setTheme] = useState("light");
  const [search, setSearch] = useState("");
  const [businesses, setBusinesses] = useState<Array<CardProps>>([]);
  const [filteredBusiness, setFilteredBusinesses] = useState<Array<CardProps>>(
    []
  );

  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  const fetchBusinesses = () =>
    getCards().then((json) => {
      setBusinesses(json);
      setFilteredBusinesses(json);
    });

  function fetchUser() {
    verifyToken()
      .then((user) => {
        if (user) {
          getCardByUser(user._id).then((cards) => {
            setUser({
              ...user,
              cards: cards.map(({ _id }) => _id),
            });
          });
        }
      })
      .catch((err) => {
        // do nothing
      });
  }

  useEffect(() => {
    fetchBusinesses();
    fetchUser();
  }, []);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);

    const term = value.toLowerCase();
    const result = [...businesses].filter((card) =>
      card.bizTitle.toLowerCase().includes(term)
    );

    setFilteredBusinesses(result);
  }

  async function onDelete(_id: string) {
    const res = await deleteCard(_id);

    const updated = [...businesses].filter((card) => card._id !== _id);

    setBusinesses(updated);

    toast.success(`Business Card has been deleted successfully!`);
    fetchBusinesses();
  }

  return (
    <div id="app" className={theme} data-bs-theme={theme}>
      <AppContext.Provider value={{ user, setUser, fetchUser }}>
        <Header
          search={search}
          handleSearch={handleSearch}
          toggleTheme={toggleTheme}
        />
        <ToastContainer position="top-right" />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onDelete={onDelete}
                filteredBusiness={filteredBusiness}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login fetchUser={fetchUser} />} />
          <Route
            path="sandbox"
            element={
              <AdminGuard>
                <SandBox />
              </AdminGuard>
            }
          />
          <Route
            path="/edit/:id"
            element={<Edit fetchBusinesses={fetchBusinesses} />}
          />
          <Route path="/business/:id" element={<BusinessPage />} />
          <Route
            path="/create"
            element={
              <CreateCard
                fetchBusinesses={fetchBusinesses}
                fetchUser={fetchUser}
              />
            }
          />
          <Route
            path="/mycards"
            element={<MyCards businesses={businesses} onDelete={onDelete} />}
          />
          <Route
            path="/favcards"
            element={<FavCards businesses={businesses} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/edituser/:id"
            element={<EditUser fetchUser={fetchUser} />}
          />
        </Routes>
        <Footer />
      </AppContext.Provider>
    </div>
  );
}

export default App;
