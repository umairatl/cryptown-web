import {useLogout} from '../../hooks/useLogout';
import Navbar from '../../components/navbar/navbar'

const Profile = () => {
    const {logout} = useLogout();

    const handleClick = () => {
        logout();
    }

    return ( 
        <div className="profile">
            <Navbar />  
            <h1>PROFILE PAGE</h1>
            <button onClick={handleClick}>Log out</button>
        </div>
     );
}
 
export default Profile;