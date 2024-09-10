import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link,useNavigate } from 'react-router-dom'
import {Button, Logo, Input} from './index'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux' 
function SignUp() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [error,setError]=useState("")
    const {register,handleSubmit}=useForm()

    const create=async(data)=>{
        setError("")
        try {
            const session=await authService.createAccount(data)
            console.log("The session value is",session);
            if(session){
                const userData=await authService.getCurrentUser()
                console.log(userData);
                if(userData) dispatch(login(userData))
                navigate("/")
                
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
      <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%'/>
            </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Create Account to Singn In</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                       Login
                    </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(create)}>
        <div className='space-y-5'>
        <Input
            label="Name"
            placeholder="Your name here..."
            {...register("name",{
                required:true
            })}
            />
            <Input
            label="Email"
            placeholder="Enter your email here..."
            type="email"
            {...register("email",{
                required:true,
                validate:{
                    matchPattern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
            })}
            />
            <Input
            type="password"
            label="Password: "
            placeholder="Enter your password here"
            {...register("password",{
                required:true,
            })}
            />
            <Button
            type="submit"
            className='w-full'
            >Sign Up</Button>
        </div>
        </form>
        </div>
      
    </div>
  )
}

export default SignUp
