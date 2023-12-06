import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { registerUser } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    fullname: "",
    email: "",
    password: "",
  };

     // form validation rules 
     const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .required('Full Name is required'),
        // email: Yup.string()
        //     .required('Email is required'),
        phone_number: Yup.string()
            .required('Phone is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(12, "Password cannot exceed more than 12 characters"),
        cpassword: Yup.string()
            .required("Confirm Password is required")
            .min(6, "Password length should be at least 6 characters")
            .max(12, "Password cannot exceed more than 12 characters")
            .oneOf([Yup.ref("password")], "Passwords do not match")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    async function onSubmit({ fullname, username, phone_number, password, cpassword }) {
        console.log(fullname, username, phone_number, password, cpassword)
        try {
            await dispatch(registerUser({ fullname, username, phone_number, password, cpassword })).unwrap();

            // redirect to login page and display success alert
            navigate('/login');
            // dispatch(clearMessage.success({ message: 'Registration successful', showAfterRedirect: true }));
        } catch (error) {
            // dispatch(clearMessage.error(error));
        }
    }

  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <input
                  name="fullname"
                  type="text"
                  {...register("fullname")}
                  className={`form-control ${
                    errors.fullname ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.fullname?.message}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  {...register("email")}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  {...register("password")}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </div>

              <div className="form-group">
                <button disabled={isSubmitting} type="submit" className="btn btn-primary btn-block">
                {isSubmitting && <span>loading...</span> } {!isSubmitting && <span>Create an account</span>}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {message && (
        <div className="form-group">
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;