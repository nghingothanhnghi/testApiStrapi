import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useToastContext, ADD, REMOVE_ALL } from "../contexts/ToastContext";
import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Login = () => {
  let navigate = useNavigate();
  const { toastDispatch } = useToastContext();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { messageAlert } = useSelector((state) => state.message);

  console.log(isLoggedIn, "State Authorize")
  console.log(messageAlert, "Response Message")

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ username, password }) {
    return dispatch(login({ username, password }))
      .unwrap()
      .then((res) => {
        navigate("/");
        toastDispatch({
          type: ADD,
          payload: {
            content: () => {
              return (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{res.user.message}!</h4>
                  <p className="text-sm font-normal">Please try again, or contact customer service</p>
                </div>
              );
            },
            type: "isSuccess"
          }
        })
      })
      .catch((err) => {
        toastDispatch({
          type: ADD,
          payload: {
            content: () => {
              return (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{err.user.message}!</h4>
                  <p className="text-sm font-normal">Please try again, or contact customer service</p>
                </div>
              );
            },
            type: "isError"
          }
        }) 
      });
  }

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="col-md-12 login-form">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              {...register("username")}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div className="form-group">
            <button disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm me-1"></span>
              )}
              Login
            </button>
          </div>
        </form>
      </div>

      {messageAlert && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
