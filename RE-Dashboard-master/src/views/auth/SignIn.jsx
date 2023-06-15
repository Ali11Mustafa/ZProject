import InputField from "components/fields/InputField";
 
import {  useNavigate } from "react-router-dom";
import { useAuthStore } from "App";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import LangSelector from "components/langSelector/LangSelector";

export default function SignIn({userCredentials}) {

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

const [errors, setErrors] = useState({});


  const { register, handleSubmit} = useForm();

  const {t} = useTranslation()


  const handleLogin = (data) => {
    setErrors({})

    const {email, password} = userCredentials;

    if(email === data.email && password === data.password){
      login();
      navigate('/');
    }
    else {
      if (email !== data.email) {
        setErrors((prevErrors) => ({ ...prevErrors, email: true }));
      }
      else if (password !== data.password) {
        setErrors((prevErrors) => ({ ...prevErrors, password: true }));
      }
    }

  };


  return (
    <div className="flex h-full w-full items-center justify-center px-2">
      {/* Sign in section */}
      <form className=" w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]" onSubmit={handleSubmit(handleLogin)}>
        <h4 className="mb-10 text-3xl font-medium text-navy-700 dark:text-white text-center">
        {t('signin.title')}
        </h4>
        
        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label={t('signin.email')}
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
          name={"email"}
          state={errors.email ? 'error':''}
          register={register("email", { required: true })}
          value="admin@admin.com"
          
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label={t('signin.password')}
          placeholder="****"
          id="password"
          type="password"
          name="password"
          state={errors.password ? 'error':''}
          register={register("password", { required: true })}
          value="admin"
        />
        <button onClick={handleLogin} className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
        {t('signin.button')}
        </button>
      </form>


<div className="absolute top-5 right-5 ">
      <LangSelector/>
</div>
    </div>
  );
}
