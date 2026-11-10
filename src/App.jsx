
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Packages from "./components/Packages";
import About from "./components/About";
import Contact from "./components/Contact";

import "./App.css";

function App() {
    return (
        <div>
            <Navbar />
            <Home />
            <Packages />
            <About />
            <Contact />
        </div>
    );
}

export default App;
