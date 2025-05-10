import { useSelector, useDispatch } from "react-redux";
import "../styles/Profile.css";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart
} from "../redux/user/userSlice";
import { Link } from 'react-router-dom';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="profile-page-container">
  <div className="profile-page-card">
    <div className="profile-page-photo">
      <img src={currentUser?.avatar} alt="Profile" />
    </div>
    <h2>{currentUser?.username}</h2>
    <p>{currentUser?.email}</p>
    <div className="profile-button-group">
      <Link to="/add-recipe">
        <button className="profile-add-recipe-btn">Add Recipe</button>
      </Link>

      <Link to="/my-recipes">
        <button className="profile-add-recipe-btn">My Recipes</button>
      </Link>

      <div className="profile-button-row">
        <button onClick={handleSignOut} className="profile-signout-btn">Sign Out</button>
        <button onClick={handleDeleteUser} className="profile-delete-btn">Delete Account</button>
      </div>
    </div>
  </div>
</div>

  );
}
