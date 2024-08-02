import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import ThemeProvider from './utils/ThemeContext';
import Signup from './pages/Signup/Signup';
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.css';
import store from './redux/store/store';
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider> 
        <ThemeProvider>
        <Provider store={store}>
          {/* <Signup /> */}
          <App  />
        </Provider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
