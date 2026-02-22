import { useRef, useState } from "react";
import Header from "./Header";
import validate from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fullName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleSignIn = () => {
    const error = validate(
      email.current?.value || "",
      password.current?.value || "",
      !isSignInForm ? fullName.current?.value || "" : undefined,
    );
    setErrorMessage(error);
    if (error) return;

    setIsLoading(true);
    if (isSignInForm) {
      // Sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current?.value || "",
        password.current?.value || "",
      )
        .then((userCredential) => {
          // Signed in
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setErrorMessage(errorMessage);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current?.value || "",
        password.current?.value || "",
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current?.value || "",
            photoURL: "",
          })
            .then(() => {
              // Profile updated!
              // ...
              console.log(user);
              const { uid, email, displayName } = auth.currentUser!;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                }),
              );
            })
            .catch((error) => {
              // An error occurred
              console.error("Update profile error:", error);
            });
        })
        .catch((error) => {
          console.log(error);
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Netflix Logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black/80 p-12 m-40 rounded-lg flex flex-col mx-auto my-36 right-0 left-0 w-3/12"
      >
        <h1 className="text-white text-3xl font-bold mb-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 my-4 bg-gray-700 text-white rounded w-full"
            ref={fullName}
          />
        )}
        <input
          type="text"
          placeholder="Email"
          className="p-2 my-4 bg-gray-700 text-white rounded w-full"
          ref={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 my-4 bg-gray-700 text-white rounded w-full"
          ref={password}
        />
        <button
          className="p-2 my-4 bg-red-700 text-white rounded w-full flex items-center justify-center"
          onClick={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Loading...
            </div>
          ) : (
            <>
              {isSignInForm ? "Sign In" : "Sign Up"}
              <span className="ml-2">→</span>
            </>
          )}
        </button>
        {errorMessage && (
          <p className="text-red-500 text-sm my-2">{errorMessage}</p>
        )}
        <p
          className="text-white text-sm my-2 cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already have an account? Sign in now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
