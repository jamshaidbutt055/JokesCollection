import LogoIcon from "@mui/icons-material/MoodSharp";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Template from "./components/template";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App" title="app">
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h5" color="inherit" noWrap>
              J<LogoIcon sx={{ mb: "-5px", pb: "3px" }} />
              kes Collection
            </Typography>
          </Toolbar>
        </AppBar>
        <Template />
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
