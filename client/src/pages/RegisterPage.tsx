import { useState } from "react";

import AuthLayout from "../layouts/AuthLayout";

import Input from "../components/ui/Input";

import Button from "../components/ui/Button";

import { registerUser } from "../api/authApi";

import toast from "react-hot-toast";

const RegisterPage = () => {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister =
    async () => {

      // Empty validation
      if (
        !name ||
        !email ||
        !password
      ) {

        toast.error(
          "All fields are required"
        );

        return;
      }

      // Email validation
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailRegex.test(
          email
        )
      ) {

        toast.error(
          "Invalid email format"
        );

        return;
      }

      // Password validation
      if (
        password.length < 6
      ) {

        toast.error(
          "Password must be at least 6 characters"
        );

        return;
      }

      try {

        setLoading(true);

        const data =
          await registerUser(
            name,
            email,
            password
          );

        localStorage.setItem(
          "token",
          data.token
        );

        toast.success(
          "Registration successful"
        );

        setTimeout(() => {

          window.location.href =
            "/dashboard";

        }, 1000);

      } catch (error: any) {

        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Registration failed"
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

          Create Account

        </h1>

        <p className="dark:text-slate-400 text-slate-600 text-sm sm:text-base">

          Create your Smart Leads account.

        </p>

      </div>

      {/* Form */}
      <div className="space-y-5">

        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

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
          placeholder="Create password"
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
              ? "Creating Account..."
              : "Create Account"
          }
          onClick={
            handleRegister
          }
        />

      </div>

    </AuthLayout>
  );
};

export default RegisterPage;