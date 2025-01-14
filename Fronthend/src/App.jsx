import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPageNew from './pages/LoginPageNew';
import RegistrationPageNew from './pages/RegistrationPageNew';
import ConditionalNavBar from './components/sideBar/ConditionalBar';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import GroupChatPage from './pages/GroupChatPage';
import CreateGroup from './pages/CreateGroup';
import GroupDetails from './pages/GroupDetails';
import GroupOptions from './pages/GroupOptions';


import ProtectedRoute from './components/Context/ProtectedRoute';
import ProtectedGroupRoute from './components/Context/ProtectedGroupRoute';
import AuthProvider from './components/Context/AuthProvider';

import { Toaster } from './components/ui/toaster';


function App() {
  return (
    <>
    <Toaster />
    <Router>
      <Routes>
        
        {/* Auth routes */}
        <Route path="/login" element={<LoginPageNew />} />
        <Route path="/register" element={<RegistrationPageNew />} />

        {/* App routes with AuthProvider */}
        <Route
          path="*"
          element={
              <AuthProvider>
                
                  <Routes>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/groupDetails" element={<ProtectedGroupRoute><GroupDetails /></ProtectedGroupRoute>} />  
                      <Route path="/groupOptions" element={<ProtectedGroupRoute><GroupOptions /></ProtectedGroupRoute>} />    

                      {/* Logged in Routes wrapped with ProtectedRoute */}
                      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                      <Route path="/updateProfile" element={<ProtectedRoute><UpdateProfilePage /></ProtectedRoute>} />
                      <Route path="/groups" element={<ProtectedRoute><GroupChatPage></GroupChatPage></ProtectedRoute>} />
                      <Route path="/createGroup" element={<ProtectedRoute><CreateGroup /></ProtectedRoute>} />
                      <Route path="/files" element={<ProtectedRoute><h1>Files</h1></ProtectedRoute>} />
                  </Routes>
                  
              </AuthProvider>
          }
        />
      </Routes>
    </Router>
    </>
  );
}

export default App;
