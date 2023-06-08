import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./components/GlobalStyles";
import { SocketContext, socket } from "./SocketService";
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const unloadCallback = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user-monopoly"));
    if (user) {
        socket.emit("offline", { username: user.username });
    }
    return;
};

window.addEventListener("beforeunload", unloadCallback);

root.render(
    // <React.StrictMode>
    <SocketContext.Provider value={socket}>
        <Provider store={store}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Provider>
    </SocketContext.Provider>
    // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
