import FriendLayout from "../layouts/FriendLayout";
import ChessBoard from "../pages/ChessBoard/ChessBoard";
import ListFriends from "../pages/Friend/ListFriends/ListFriends";
import SearchFriend from "../pages/Friend/SearchFriends/SearchFriends";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import PrivateRoom from "../pages/PrivateRoom/PrivateRoom";
import Register from "./../pages/Register/Register";

const publicRoutes = [
    { path: "/private-room", component: PrivateRoom },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/", component: Home },
    { path: "/game", component: ChessBoard },
    { path: "search-friend", component: SearchFriend, layout: FriendLayout },
    { path: "list-friends", component: ListFriends, layout: FriendLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
