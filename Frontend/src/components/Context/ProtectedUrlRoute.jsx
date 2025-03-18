import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import PageLayout from "../Others/PageLayout";

import GroupApi from "../../services/GroupApi";
import ProfileApi from "../../services/ProfileApi";
// This route only checks the validity of the id in the url

const ProtectedUrlRoute = ({ children, idType }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateId = async () => {
      if (!id) {
        setIsValid(false);
        setIsLoading(false);
        return;
      }

      try {
        // For groups:
        if(idType === "group"){
          const response = await GroupApi.retrieveGroupInfo(id);
          setIsValid(response.success);
        }
        
        // For users:
        if(idType === "user"){
          const response = await ProfileApi.getOthersProfileData(id,id);
          setIsValid(response.success);
        }

        console.log(`Validating ${idType} with ID:`, id);
      } catch (error) {
        console.error(`Error validating ${idType}:`, error);
        setIsValid(false);
      }
      setIsLoading(false);
    };

    validateId();
  }, [id, idType]);

  useEffect(() => {
    if (!isLoading && !isValid) {
      navigate("/");
    }
  }, [isValid, navigate, isLoading]);

  return (
    <PageLayout>
      {isValid && children}
    </PageLayout>
  );
};

export default ProtectedUrlRoute;

// Todo
// Implement the actual API calls for groups and users
