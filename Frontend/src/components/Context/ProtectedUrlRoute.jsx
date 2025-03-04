import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import PageLayout from "../Others/PageLayout";


const ProtectedUrlRoute = ({ children, requiredFields = [] }) => {

  const location = useLocation();
  const navigate = useNavigate();

  const isValid = requiredFields.every((field) => location.state?.[field]);

  useEffect(() => {
    if (!isValid) {
      navigate("/"); // Redirect to home or another fallback route
    }
  }, [isValid, navigate]);

  return (
    <PageLayout>
      {isValid && children}
    </PageLayout>
  );
};

export default ProtectedUrlRoute;