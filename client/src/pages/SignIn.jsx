import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  // add functionality handle change form
  const [formData, setFormData] = useState({});

  // loading effect & error message with redux tooki
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  // dispatch
  const dispatch = useDispatch();

  // navigate
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // add functionality handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // add handle error
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields."));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col sm:flex-row md:items-center gap-7">
        {/* left side */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-cyan-600 via-purple-700 to bg-pink-700 rounded-md text-white">Firman</span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Welcome to Firman Blog! Please sign in to enjoy exclusive content, interact with the community, and access our premium features. Join discussions, enhance your digital presence, and experience the best in reading across all
            devices. Happy browsing!
          </p>
        </div>

        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Email" />
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
            </div>
            <div className="">
              <Label value="Password" />
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit" disabled={loading} outline>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex text-sm gap-2 mt-5">
            <span>Dont have an Account ?</span>
            <Link to="/sign-up" className="text-blue-600">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
