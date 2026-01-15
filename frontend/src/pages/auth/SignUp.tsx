import React from "react";
import Layout from "../../components/layout";
import type { SignUpFormData } from "../../types";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../reducers/store";
import { signUpUser } from "../../reducers/auth/authReducer";

const SignUp: React.FC = () => {
  const [formData, setFormData] = React.useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-up logic here
    dispatch(signUpUser(formData))
  };
  return (
    <Layout>
      <div className="flex items-center justify-center p-4 w-full">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
            Videos Hub
          </h1>
          <p className="text-xl font-medium text-center text-gray-800 mb-3">
            Sign up for an account
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign Up
              </button>
            </div>
            <div>
              <p className="text-sm text-center text-gray-600">
                Already have an account?{" "}
                <a
                  href="/sign-in"
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
