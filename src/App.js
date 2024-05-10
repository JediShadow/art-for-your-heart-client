import {BrowserRouter, Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Main from './components/Main/Main';
import Matches from './components/Matches/Matches';
import Messages from './components/Messages/Messages';
import Profile from './components/Profile/Profile';
import Nav from './components/Nav/Nav';
import 'semantic-ui-css/semantic.min.css'

function App() {
  const [user, setUser] = useState(null);
  const [matches,setMatches] = useState(null);
  const[modal, setModal]=useState(false);
  const [messageCount, setMessageCount] = useState({});
  const [modalPerson, setModalPerson] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  //to set Object for blurry images dpending on messageCount
  useEffect(() => {
    const fetchMessageCounts = async () => {
        try {
            const messageCounts = {};
            for (const match of matches) {
                const response = await axios.get(`http://localhost:8080/messages/${currentUser.stringId}/${match.stringId}`, { withCredentials: true });
                messageCounts[match.stringId] = response.data.length;
            }
            setMessageCount(messageCounts);
        } catch (error) {
            console.error("Failed to fetch message counts", error);
        }
    };

    if (currentUser && matches) {
        fetchMessageCounts();
    }
}, [currentUser, matches]);

  const handleLogout = () => {
    setUser(null);
    return <Navigate to="/" replace />;
  };

  const handleLogin=(user)=>{
    setUser(user);
    return <Navigate to="/main" replace />;
  }
  
  return (
    <div className="App">
<BrowserRouter>
{
    (window.location.pathname === '/main' ||
      window.location.pathname === '/matches' ||
      window.location.pathname === '/messages' ||
      window.location.pathname === '/profile') && (
        <Nav handleLogout={handleLogout} setModal={setModal} />
      )
  }
        <Routes>
          <Route path="/"element={<Login handleLogin={handleLogin} user={user}  />}/>
          <Route path="/signup" element={<Signup handleLogin={handleLogin}/>} />
          <Route path="/main" element={ <Main setMatches={setMatches} modal={modal} setModal={setModal} modalPerson={modalPerson} setModalPerson= {setModalPerson} messageCount={messageCount}/>}/>
          <Route path="/matches" element={<Matches matches={matches} modal={modal} setModal={setModal} modalPerson={modalPerson} setModalPerson= {setModalPerson} messageCount={messageCount}/>}/>
          <Route path="/messages" element={<Messages matches={matches} messageCount={messageCount} setMessageCount={setMessageCount} />} />
          <Route path="/profile" element={<Profile handleLogout={handleLogout} user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
