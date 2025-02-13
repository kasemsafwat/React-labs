import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { TokenContext } from "../Context/TokenContext";
import { useLocation } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setUserName } = useContext(TokenContext);
  const location = useLocation();
  const message = location.state?.message || "";

  const validationSchema = Yup.object({
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
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post(
          "https://sara7a-app-api.vercel.app/api/auth/login",
          values
        );

        const { verificationToken, userName } = response.data.user;

        setToken(verificationToken);
        setUserName(userName);

        navigate("/");
      } catch (error) {
        console.error("Login error:", error.response?.data);
        setErrors({ email: "Invalid email.", password: "Invalid Password." });
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
              <Link to={"/register"}>Sign Up</Link>
            </div>
          </div>
        </div>

        <div className="form-field-register">
          <div className="form-container">
            {message && (
              <div className="alert alert-warning text-center">{message}</div>
            )}
            <h1>Sign In</h1>
            <form onSubmit={formik.handleSubmit}>
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

              <button
                type="submit"
                className="submit-btn"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
