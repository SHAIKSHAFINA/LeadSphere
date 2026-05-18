import { useState } from "react";

import AuthLayout from "../layouts/AuthLayout";

import Input from "../components/ui/Input";

import Button from "../components/ui/Button";

import { loginUser } from "../api/authApi";

import toast from "react-hot-toast";

const LoginPage = () => {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {

    // Empty validation
    if (!email || !password) {

      toast.error(
        "All fields are required"
      );

      return;
    }

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(email)
    ) {

      toast.error(
        "Invalid email format"
      );

      return;
    }

    try {

      setLoading(true);

      const data =
        await loginUser(
          email,
          password
        );

      localStorage.setItem(
        "token",
        data.token
      );

      toast.success(
        "Login successful"
      );

      setTimeout(() => {

        window.location.href =
          "/dashboard";

      }, 1000);

    } catch (error) {

      console.log(error);

      toast.error(
        "Invalid credentials"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <AuthLayout>

      {/* Header */}
      <div className="text-center mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-slate-900 mb-3">

          Welcome Back

        </h1>

        <p className="dark:text-slate-400 text-slate-600 text-sm sm:text-base">

          Sign in to continue managing leads.

        </p>

      </div>

      {/* Form */}
      <div className="space-y-5">

        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <Button
          title={
            loading
              ? "Signing In..."
              : "Sign In"
          }
          onClick={
            handleLogin
          }
        />

      </div>

    </AuthLayout>
  );
};

export default LoginPage;