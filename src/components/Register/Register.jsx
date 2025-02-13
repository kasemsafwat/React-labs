import React from "react";
import "./register.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(
        3,
        "Username must be between 3 and 30 characters and can contain letters, numbers, and underscores."
      )
      .max(
        30,
        "Username must be between 3 and 30 characters and can contain letters, numbers, and underscores."
      )
      .matches(
        /^[a-zA-Z0-9_ ]+$/,
        "Username must be between 3 and 30 characters and can contain letters, numbers, and underscores."
      )
      .required("Username is required."),
    email: Yup.string()
      .email("Please enter a valid email address (e.g., user@example.com).")
      .required("Email is required."),
    password: Yup.string()
      .min(
        6,
        "Password must be at least 6 characters and include an uppercase letter, lowercase letter, number, and special character (!@#$%^&*)."
      )
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
        "Password must be at least 6 characters and include an uppercase letter, lowercase letter, number, and special character (!@#$%^&*)."
      )
      .required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match.")
      .required("Confirm password is required."),
    phone: Yup.string().required("Phone number is required."),
  });

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post(
          "https://sara7a-app-api.vercel.app/api/auth/register",
          values
        );
        navigate("/login");
      } catch (error) {
        console.error("Registration error:", error.response?.data);
        setErrors({ email: "Email is already in use." });
      }
      setSubmitting(false);
    },
  });

  return (
    <React.Fragment>
      <div className="registration-block">
        <div className="image-register">
          <div className="content-above-login">
            <p className="big-text">
              Join us in <span id="text-effect">Bazario</span>
            </p>
            <p className="small-text">
              Do not miss out! Sign up for special promotions and discounts from
              companies.
            </p>
            <div className="already">
              <span>Already have an account?</span>
              <Link to={'/login'}>Sign In</Link>
            </div>
          </div>
        </div>

        <div className="form-field-register">
          <div className="form-container">
            <h1>Sign Up</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-row">
                <div className="input-group">
                  <input
                    type="text"
                    name="userName"
                    className="input"
                    placeholder=""
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="user-label">User Name</label>
                  {formik.touched.userName && formik.errors.userName && (
                    <div className="alert alert-danger" role="alert">
                      {formik.errors.userName}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder=""
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="user-label">Email</label>
                  <p className="error-msg">
                    {formik.touched.email && formik.errors.email && (
                      <div className="alert alert-danger" role="alert">
                        {formik.errors.email}
                      </div>
                    )}
                  </p>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    className="input"
                    placeholder=""
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="user-label">Password</label>
                  {formik.touched.password && formik.errors.password && (
                    <div className="alert alert-danger" role="alert">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="input"
                    placeholder=""
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="user-label">Confirm Password</label>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <div className="alert alert-danger" role="alert">
                        {formik.errors.confirmPassword}
                      </div>
                    )}
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <input
                    type="text"
                    name="phone"
                    className="input"
                    placeholder=""
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="user-label">Phone Number</label>
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="alert alert-danger" role="alert">
                      {formik.errors.phone}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
