import React from "react";
// import ReactDOM from "react-dom";
import App from "./App";
import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';

// function AppWrapper() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {/* Other routes */}
//       </Routes>
//     </Router>
//   );
// }

// function Home() {
//     return (
//       <div>
//         {/* Home component content */}
//       </div>
//     );
//   }

// ReactDOM.render(<App />, document.getElementById("root"));

createRoot(document.getElementById('root')).render(

<React.StrictMode>
    <Router>
        <App />
    </Router>
</React.StrictMode>
);