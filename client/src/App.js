// function App() {
//   return (
//     <div>
//       <Nav />
//       <Books />
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Books from "./pages/Books";
import BookDetail from "./pages/Books";
// import NoMatch from "./pages/NoMatch";
import SearchBooks from "./pages/SearchBooks";
import Navbar from "./components/Nav";
//import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper"; 

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Wrapper>
          <Route exact path="/" component={Books} />
          <Route exact path="/bookdetail" component={BookDetail} />
          <Route exact path="/searchbooks" component={SearchBooks} />
          {/* <Route exact path="/nomatch" component={NoMatch} /> */}
        </Wrapper>
      </div>
    </Router>
  );
}

export default App;