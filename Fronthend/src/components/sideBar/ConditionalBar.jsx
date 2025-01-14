import React, { useContext } from 'react';
import DefaultNavBar from '../sideBar/DefaultNavBar';
import SideBar from '../sideBar/SideBar';
import CustomSpinner from '../Others/CustomSpinnner';

import { AuthContext } from '../../utils/AuthContext';

const ConditionalNavBar = () => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <CustomSpinner text="Checking Authenticaion..."/>
        );
    }
    

    return isAuthenticated ? <SideBar /> : <DefaultNavBar />;
};

export default ConditionalNavBar;