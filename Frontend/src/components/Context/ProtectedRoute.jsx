import React, { useContext, useEffect } from 'react';
import { Navigate  } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

import { AuthContext } from '../../utils/AuthContext'; 

import PageLayout from '../Others/PageLayout';
import CustomSpinner from '../Others/CustomSpinnner';


// Acts as a second layer protection
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) {
    return <CustomSpinner text="Loading..."/>;
  }

  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <PageLayout>
        {children}   
    </PageLayout>
  );
  
};

export default ProtectedRoute;