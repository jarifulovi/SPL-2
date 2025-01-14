import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import PageLayout from "../Others/PageLayout";


const ProtectedGroupRoute = ({ children }) => {

  const location = useLocation();
  const navigate = useNavigate();

  const { group } = location.state || {};
  console.log(group);

  useEffect(() => {
    if (!group) {
      navigate("/");
    }
  }, []);


  return (
    <PageLayout>
      {children}
    </PageLayout>
  );
};

export default ProtectedGroupRoute;