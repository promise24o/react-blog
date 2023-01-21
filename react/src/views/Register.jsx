import axios from 'axios';
import React, { createRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import { toast } from 'react-toastify';

export default function Register() {
    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()

    const {setUser, setToken}    = useStateContext()
    const [errors, setErrors] = useState(null)

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payLoad = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        axiosClient.post('register', payLoad)
        .then(({data}) => {
            setUser(data.user);
            setToken(data.token);
            console.log(data);
        }).catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                console.log(response.data.errors);
                setErrors(response.data.errors)
                toast('🦄 An Error has Occured ', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        })
    }
  return (
      <div className='login-signup-form animated fadeInDown'>
          <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div class="w-full max-w-md space-y-8">
                  <div>
                      <Link to="/"><img class="mx-auto h-12 w-auto animate-pulse" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /></Link>
                      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create New Account</h2>
                      <p class="mt-2 text-center text-sm text-gray-600">
                          Or
                          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> start your 14-day free trial</a>
                      </p>
                  </div>

                  {errors &&
                      <div className="">
                          {Object.keys(errors).map(key => (
                              <div key={key} class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-2" role="alert">
                                  <span class="block sm:inline">{errors[key][0]}</span>
                              </div>
                          ))}
                      </div>
                  }
                  <form class="mt-8 space-y-6" onSubmit={onSubmit} method="POST">
                      <input type="hidden" name="remember" value="true" />
                      <div class="-space-y-px rounded-md shadow-md">
                          <div>
                              <label for="fullname" class="sr-only">Fullname</label>
                              <input ref={nameRef} id="fullname" name="fullname" type="text" autocomplete="fullname" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Fullname" />
                          </div>
                          <div>
                              <label for="email-address" class="sr-only">Email address</label>
                              <input ref={emailRef} id="email-address" name="email" type="email" autocomplete="email" required class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
                          </div>
                          <div>
                              <label for="password" class="sr-only">Password</label>
                              <input ref={passwordRef} id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
                          </div>
                          <div>
                              <label for="confirm-password" class="sr-only">Confirm Password</label>
                              <input ref={passwordConfirmationRef} id="confirm-password" name="confirm_password" type="password" autocomplete="current-password" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Confirm Password" />
                          </div>
                      </div>

                      <div class="flex items-center justify-center">
                          <div class="text-sm">
                              <Link to="/login"><p class="font-medium text-indigo-600 hover:text-indigo-500">Already have an Account</p></Link>
                          </div>
                      </div>

                      <div>
                          <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                              <span class="absolute inset-y-0 left-0 flex items-center pl-3">

                                  <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                      <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                                  </svg>
                              </span>
                              Confirm Register
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  )
}
