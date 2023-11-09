import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ChatComponent from './components/ChatComponent';
import SignInFormComponent from './components/signInComponent.jsx';
import SignUpFormComponent from './components/signUpComponent.jsx';
import FirstLayoutComponent from './components/FirstLayoutComponent';
import PrivateChat from './components/PrivateChat';
import PersistLogin from './components/PersitLogin.jsx';
import RequireAuth from "./hooks/RequireAuth";
import HomeComponent from './components/HomeComponent.jsx';
import VerifyCodeComponent from './components/VerifyCodeComponent.jsx';

function App() {
  //<BrowserRouter basename='chat-app'>
  return (
    
    <BrowserRouter>
      <Routes>
        
          <Route path="/" element={<HomeComponent />} />
          <Route path="/signup" element={<SignUpFormComponent />} />
          <Route path="/verify-code" element={<VerifyCodeComponent />} />
          <Route path="/signin" element={<SignInFormComponent />} />
          
          
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/chat" element={<ChatComponent />} exact />
              <Route path="/first-layout" element={<FirstLayoutComponent />} exact />
              <Route path="/private-chat/:id" element={<PrivateChat />} exact />
            </Route>
          </Route>
        
      </Routes>
      </BrowserRouter>
  
  );
}

export default App;
