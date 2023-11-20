import React,{useState} from 'react'
import authService from '../appwrite/auth';
import { Link,useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import Button from './Button';
import { useDispatch } from 'react-redux';
import {useForm } from 'react-hook-form';
import Input from './Input';
import {Logo} from './index';


function Signup() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [error,seterror]=useState("");
    const {register,handleSubmit}=useForm();

    const create=async(data)=>
    {
        seterror("");
        try{
            const userData=await authService.createAccount(data);

            if(userData) {
                const user=await authService.getCurrentUser();
                if(user) dispatch(login(userData));
                navigate("/");
            }
        }
        catch(error)
        {
            seterror(error);
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
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to Your Accout</h2>
        <p className='mt-2 text-center text-base text-black/60'>
            Already have any account?&nbsp;
            <Link
                to="/login"
                className='font-medium text-primary transition-all duration-200 hover:underline'
            >
                Sign In
            </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(create)}>
            <div className='space-y-5'>
                <Input label="Name:= "
                placeholder="Enter Your Full name"
                {...register("name",{
                    required:true,
                })}
                />

                <Input 
                    label="Email :"
                    placeholder="Enter Your Email"
                    type="email"
                    {...register("email",{
                        required:true,
                        validate:{
                            matchPattern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 
                            "Email address must be a valid address",
                        }
                    })}
                />

                <Input label="Password" type="password" placeholder="Enter Your Password"
                    {...register("password",{
                        required:true
                    })}
                />

                <Button type='submit' className='w-full'>Create Accout</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Signup
