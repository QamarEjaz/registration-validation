// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { TextField } from "../components/TextField";
import { useNavigate } from "react-router-dom";
import rocketImg from "../assets/rocket.png";
const Login = () => {
  const navigate = useNavigate();
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });
  const navigateUser = () => {
    navigate("/userdashbord");
  };
  return (
    <>
      <div className="container mt-3">
        <div className="col-md-7 my-auto">
          <img className="img-fluid w-100" src={rocketImg} alt="" />
        </div>
        <div className="row">
          <div className="col-md-5">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                if (values) {
                  navigate("/userdashbord");
                } else {
                  navigate("/");
                }
              }}
            >
              {(formik) => (
                <div style={{ marginTop: "118px" }}>
                  <h1 className="my-4 font-weight-bold .display-4">Sign in</h1>
                  <Form style={{ marginTop: "10px" }}>
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      autoComplete="off"
                    />
                    <TextField
                      label="password"
                      name="password"
                      type="password"
                      autoComplete="off"
                    />
                    <button className="btn btn-dark mt-3" type="submit">
                      SignIn
                    </button>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
