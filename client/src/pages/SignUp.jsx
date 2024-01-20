import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
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
            Join our blog application and embark on an exciting journey of sharing ideas and inspiration. By signing up, you can create a personal blog, participate in discussions, and discover engaging content from writers around the
            world. Register now to kickstart your unique blogging experience!
          </p>
        </div>

        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="Username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div className="">
              <Label value="Email" />
              <TextInput type="text" placeholder="name@company.com" id="email" />
            </div>
            <div className="">
              <Label value="Password" />
              <TextInput type="text" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit">
              Sign Upp
            </Button>
          </form>
          <div className="flex text-sm gap-2 mt-5">
            <span>Have an Account ?</span>
            <Link to="/sign-in" className="text-blue-600">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
