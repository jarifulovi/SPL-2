import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPageNew from './pages/LoginPageNew';
import RegistrationPageNew from './pages/RegistrationPageNew';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import OthersProfilePage from './pages/OthersProfilePage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import GroupChatPage from './pages/GroupChatPage';
import CreateGroup from './pages/CreateGroup';
import UpdateGroup from './pages/UpdateGroup';
import GroupDetails from './pages/GroupDetails';
import GroupOptions from './pages/GroupOptions';


import ProtectedRoute from './components/Context/ProtectedRoute';
import ProtectedUrlRoute from './components/Context/ProtectedUrlRoute';
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
                      <Route path="/groupDetails" element={<ProtectedUrlRoute requiredFields={['group']}><GroupDetails /></ProtectedUrlRoute>} />  
                      <Route path="/groupOptions" element={<ProtectedUrlRoute requiredFields={['group']}><GroupOptions /></ProtectedUrlRoute>} />    
                      <Route path="/updateGroup" element={<ProtectedUrlRoute requiredFields={['group_id']}><UpdateGroup /></ProtectedUrlRoute>} />
                      <Route path="/othersProfile" element={<ProtectedUrlRoute requiredFields={['profileUserId']}><OthersProfilePage /></ProtectedUrlRoute>} />

                      {/* Logged in Routes wrapped with ProtectedRoute */}
                      <Route path="/accountSettings" element={<ProtectedRoute><AccountSettingsPage /></ProtectedRoute>} />
                      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
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
