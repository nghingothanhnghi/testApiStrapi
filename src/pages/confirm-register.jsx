import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function ConfirmRegisteredPage() {
  const dispatch = useDispatch();


  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting } = formState;
  function onSubmit({ username, confirm_code }) {
    return dispatch(confirmSignUp({ username, confirm_code }))
      .unwrap()
      .then((res) => {
        // navigate("/");
        // window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        // handle error
        console.log(err, "error");
      });
  }
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Confirm Code
            </h2>

            <form
              className="max-w-sm mx-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
                <div>
                  <label htmlFor="code-1" className="sr-only">
                    First code
                  </label>
                  <input
                    type="text"
                    maxlength="1"
                    onKeyUp="focusNextInput(this, 'code-1', 'code-2')"
                    id="code-1"
                    className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="code-2" className="sr-only">
                    Second code
                  </label>
                  <input
                    type="text"
                    maxlength="1"
                    onKeyUp="focusNextInput(this, 'code-1', 'code-3')"
                    id="code-2"
                    className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="code-3" className="sr-only">
                    Third code
                  </label>
                  <input
                    type="text"
                    maxlength="1"
                    onKeyUp="focusNextInput(this, 'code-2', 'code-4')"
                    id="code-3"
                    className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="code-4" className="sr-only">
                    Fourth code
                  </label>
                  <input
                    type="text"
                    maxlength="1"
                    onKeyUp="focusNextInput(this, 'code-3', 'code-5')"
                    id="code-4"
                    className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="code-5" className="sr-only">
                    Fivth code
                  </label>
                  <input
                    type="text"
                    maxlength="1"
                    onKeyUp="focusNextInput(this, 'code-4', 'code-6')"
                    id="code-5"
                    className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="code-6" className="sr-only">
                    Sixth code
                  </label>
                  <input
                    type="text"
                    maxlength="1"
                    onKeyUp="focusNextInput(this, 'code-5', 'code-6')"
                    id="code-6"
                    className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
              </div>
              <p
                id="helper-text-explanation"
                className="mt-2 text-sm text-gray-500 dark:text-gray-400"
              >
                Please introduce the 6 digit code we sent via email.
              </p>
              <button disabled={isSubmitting} type="submit" className="w-full text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Confirm</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
