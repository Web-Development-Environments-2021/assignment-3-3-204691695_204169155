import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/playerpage",
    name: "playerpage",
    component: () => import("./pages/PlayerPage")
  },
  {
    path: "/teampage",
    name: "teampage",
    component: () => import("./pages/TeamPage")
  },
  {
    path: "/farpage",
    name: "farpage",
    component: () => import("./pages/FarPage")
  },
  {
    path: "/favoritegamespage",
    name: "favoritegamespage",
    component: () => import("./pages/FavoriteGamesPage")
  },
  {
    path: "/seasongames",
    name: "seasongames",
    component: () => import("./pages/SeasonGames")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
