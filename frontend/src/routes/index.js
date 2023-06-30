import FriendLayout from "../layouts/FriendLayout";
import ChessBoard from "../pages/ChessBoard/ChessBoard";
import ListInvites from "../pages/Friend/InviteFriend/InviteFriend";
import ListFriends from "../pages/Friend/ListFriends/ListFriends";
import SearchFriend from "../pages/Friend/SearchFriends/SearchFriends";
import RankFriends from "../pages/Friend/RankFriend/RankFriend";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import PrivateRoom from "../pages/PrivateRoom/PrivateRoom";
import Profile from "../pages/Profile/Profile";
import Register from "./../pages/Register/Register";
import Event from "./../pages/Event/Event";
import Shop from "../pages/Shop/Shop";


const publicRoutes = [
    { path: "/event", component: Event },
    { path: "/profile/:username", component: Profile },
    { path: "/private-room/:username", component: PrivateRoom },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/", component: Home },
    { path: "/game", component: ChessBoard },
    { path: "search-friend", component: SearchFriend, layout: FriendLayout },
    { path: "list-friends", component: ListFriends, layout: FriendLayout },
    { path: "list-invites", component: ListInvites, layout: FriendLayout },
    { path: "rank-friends", component: RankFriends, layout: FriendLayout },
    { path: "/shop", component: Shop},

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
