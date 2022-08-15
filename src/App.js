import "./App.css";
import React from "react";
import Nav from "./Components/Nav/Nav.jsx"
import MapContainer from "./Components/MapContainer/MapContainer.jsx"
import Filter from "./Components/Filter/Filter.jsx"
import Explore from "./Components/Explore/Explore.jsx"
import About from "./Components/About/About.jsx"

function App(props) {

  return (
    <div className="App">
    <Nav/>
  <Filter />
   <MapContainer />
<Explore />
  <About />
</div>
  )
}

export default App;
