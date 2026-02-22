import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, addUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { NETFLIX_LOGO, NETFLIX_USER_ICON } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store: any) => store.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    // TODO: Implement sign out logic
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.error("Sign out error:", error);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          }),
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      // Cleanup function
      unsubscribe();
    };
  }, []);
  return (
    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10 flex justify-between items-center">
      <img className="w-44 p-2" src={NETFLIX_LOGO} alt="Netflix Logo" />
      {user && (
        <div className="flex items-center gap-4 p-2">
          <img className="w-8 h-8" alt="usericon" src={NETFLIX_USER_ICON} />
          {user && <span className="text-white">{user.displayName}</span>}
          <button
            className="text-white ml-2 px-4 py-2 bg-red-600 rounded cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
