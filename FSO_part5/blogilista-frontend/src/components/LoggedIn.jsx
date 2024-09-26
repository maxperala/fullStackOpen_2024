import userUtils from "../utils/userUtils";


const LoggedIn = ({user, setUser, showNotification}) => {

    const onLogOut = () => {
        userUtils.logout(setUser);
        showNotification("Logged out")
    }
    return (
        <div>
            <p>Logged in as {user.name}</p>
            <button onClick={onLogOut}>Logout</button>
        </div>
    )
}




export default LoggedIn;