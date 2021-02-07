import './App.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
    <div className="App">
      <nav>
        <div className="header">Online Directory</div>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>

      {/* Register */}
      <Route 
      path="/register"
      component={Register}
      />

      {/* Login */}
      <Route 
      path="/login"
      component={Login}
      />

      {/* Directory (authorized) */}

    </div>
    </Router>
  );
}

export default App;
