import { useNavigate } from 'react-router-dom';


 
function navigateTo (path) {

    const navigate = useNavigate();
    navigate(path);
}


export default navigateTo;