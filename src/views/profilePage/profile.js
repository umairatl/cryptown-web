import {useLogout} from '../../hooks/useLogout';

const Profile = () => {
    const {logout} = useLogout();

    const handleClick = () => {
        logout();
    }


    return ( 
        <div className="profile">
            <h1>PROFILE PAGE</h1>
            <button onClick={handleClick}>Log out</button>
        </div>
     );
}
 
export default Profile;