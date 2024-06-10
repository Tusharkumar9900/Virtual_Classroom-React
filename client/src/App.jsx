import React, {useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

// Pages
// // import LoginPage from "./Pages/LoginPage/LoginPage";
// // import DashBoard from "./Pages/DashBoard/DashBoard";

// // import MeetWindow from "./Pages/MeetWindow/MeetWindow.component";
// // import AssignmentPage from "./Pages/AssignmentPage/AssignmentPage";

// CSS
import "./App.css";
import ChatArea from "./ChatArea/ChatArea.component";

// // // Context API
// // import { UserProvider } from "./Context/userContext";
// // import { MeetProvider } from "./Context/meetContext";
// // import { AssignmentProvider } from "./Context/assignmentContext";

const App = () => {

  useEffect(() => {
    setInterval(function () {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}`);
    }, 300000); // every 5 minutes (300000)
  });
  
   
//   return (
//     <BrowserRouter>
//       <Routes>
//         <UserProvider>
//           <MeetProvider>
//             <AssignmentProvider>
//               <Route path="/" exact component={LoginPage} />
//               <Route path="/dashboard" exact component={DashBoard} />
//               <Route path="/dashboard/chat" component={ChatArea} />
//               <Route path="/meet" exact component={MeetWindow} />
//               <Route path="/assignment" component={AssignmentPage} />
//             </AssignmentProvider>
//           </MeetProvider>
//         </UserProvider>
//       </Routes>
//     </BrowserRouter>
//   );
// };
return (
        <Routes>
          <Route path="/" element ={ < ChatArea />} />
        </Routes>
        );
       };


export default App;
