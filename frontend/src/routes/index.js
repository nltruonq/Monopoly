import ChessBoard from "../pages/ChessBoard/ChessBoard";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "./../pages/Register/Register";

const publicRoutes = [
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/", component: Home },
    { path:"/game", component: ChessBoard}
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
