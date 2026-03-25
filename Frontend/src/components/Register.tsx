import React, { useState } from "react";

export default function Register()
{
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    login: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) =>
  {
    e.preventDefault();

    if (form.password !== form.confirmPassword)
    {
      setMessage("Passwords do not match");
      return;
    }

    // TEMP TEST
    console.log("Register Data:", form);
    setMessage("Registration successful (for now)");
  };

  return (
    <div id="registerDiv">
      <span id="inner-title">PLEASE REGISTER</span><br />

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        /><br />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        /><br />

        <input
          type="text"
          name="login"
          placeholder="Username"
          value={form.login}
          onChange={handleChange}
        /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        /><br />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        /><br />

        <button type="submit">Register</button>
      </form>

      <span>{message}</span><br />

      {/* Back to Login */}
      <button onClick={() => window.location.href = "/"}>
        Back to Login
      </button>
    </div>
  );
}