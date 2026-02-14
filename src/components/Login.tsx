import React, { useRef, useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const fullName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleSignIn = () => {
    console.log("Sign in clicked");
    console.log("Full Name:", fullName.current?.value);
    console.log("Email:", email.current?.value);
    console.log("Password:", password.current?.value);
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
          className="p-2 my-4 bg-red-700 text-white rounded w-full"
          onClick={handleSignIn}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
          <span className="ml-2">→</span>
        </button>
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
