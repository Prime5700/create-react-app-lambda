import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import Loading from "./components/Loading";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <ToastContainer hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
