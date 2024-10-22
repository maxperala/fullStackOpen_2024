import { useSelector } from "react-redux";

const Notification = () => {
    const notif = useSelector((state) => state.notification);
    if (notif) {
        return (
            <div>
                <h3>{notif}</h3>
            </div>
        );
    }
    return null;
};

export default Notification;
