"use client";
import { FC, useState } from "react";
import Button from "./Button";
import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { ZodError , z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface AddFriendButtonProps {}

//since we are in typeScript we have to assign a type of form data using zod
type FormData = z.infer<typeof addFriendValidator>

const AddFriendButton: FC<AddFriendButtonProps> = () => {
  const [ShowSucessState, setShowSucessState] = useState<boolean>(false);

  
  // using useForm hook
  const {register ,handleSubmit ,setError ,formState:{errors} } =useForm<FormData>({
    resolver:zodResolver(addFriendValidator)
  })


  const addFriend = async (email: string) => {
    try {
      const validatedemail = addFriendValidator.parse({ email });
      await axios.post("/api/friends/add", {
        email: validatedemail,
      })
      setShowSucessState(true);
    } catch (error) {
        if(error instanceof ZodError){
            setError('email',{message:error.message})
            return ;
        }

        if(error instanceof AxiosError){
          setError('email' ,{message:error.response?.data})
          return;
        }

        setError('email' ,{message:'Something Went Wrong'})
    }
  };

  
    //to sumit the form
    const onSubmit=(data:FormData)=>{
      addFriend(data.email)
     }


  return <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900"> Add Friend Via Email</label>
   <div className="mt-2 flex gap-4">
    <input {...register('email')} type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6" placeholder="...@gmail.com"/>
    <Button>Add</Button>

   </div>
    <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>

    {ShowSucessState ? (
      <p className="mt-1 text-sm text-green-500">Friend request sent !</p>
    ) : null}

  </form>;
};

export default AddFriendButton;
