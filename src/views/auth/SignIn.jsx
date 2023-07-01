import InputField from "components/fields/InputField";

import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import { useAuthStore } from "App";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import LangSelector from "components/langSelector/LangSelector";

export default function SignIn({ userCredentials }) {

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  let [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target
    console.log(event.target);
    console.log(".../")
    setInputs(items => {
      return {
        ...items,
        [name]: value
      }
    });
  }
//
  const [errors, setErrors] = useState({});


  const { register, handleSubmit } = useForm();

  const { t } = useTranslation()


  const handleLogin = async (data) => {
    console.log("Data", data)
    setErrors({});
    // data.preventDefault();

    var formdata = new FormData();

    formdata.append("email", data.email);
    formdata.append("password", data.password);

    try {
      const req = await api.post('/login', formdata,
        {

          headers: {
            "Accept": "application/json"
          }
        }
      );
      if (req.status == 200) {
        const { token } = req.data;
        console.log("token", token);
        console.log(req.data.user_id);
        const req_detail = await api.get(`/users/${req.data.user_id}`, {
          
        headers: {
            Authorization: `Bearer ${token}`, // Use the extracted token
            // 'Accept-Language': lang
          }
        });

        
        if (req_detail.status == 200) {
          console.log(req_detail);
          const { email, name, salary, role, id } = req_detail.data.data;

          const sessStorage = {
            id: id,
            email: email,
            name: name,
            salary: salary,
            role: role,
            token: req.data.token
          };

          sessionStorage.setItem("user", JSON.stringify(sessStorage));
          login();
          navigate('/', { replace: true });
          return;
        } 
      }
      throw Error('The Auth faild');

    } catch (e) {
      console.log(e);

    }

    // if(email === data.email && password === data.password){
    //   login();
    //   navigate('/');
    // }
    // else {
    //   if (email !== data.email) {
    //     setErrors((prevErrors) => ({ ...prevErrors, email: true }));
    //   }
    //   else if (password !== data.password) {
    //     setErrors((prevErrors) => ({ ...prevErrors, password: true }));
    //   }
    // }

  };
  return (
    <div className="flex h-full w-full items-center justify-center px-2">
      {/* Sign in section */}
      <form className=" w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]" onSubmit={handleSubmit(handleLogin)}>
        <h4 className="mb-10 text-3xl font-medium text-navy-700 dark:text-white text-center">
          {t('signin.title')}
        </h4>

        <InputField
          // Onchanged={handleChange}
          variant="auth"
          extra="mb-3"
          label={t('signin.email')}
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
          name={"email"}
          state={errors.email ? 'error' : ''}
          register={register("email", { required: true })}
        />
        {/* Password */}
        <InputField
          // Onchanged={handleChange}
          variant="auth"
          extra="mb-3"
          label={t('signin.password')}
          placeholder="****"
          id="password"
          type="password"
          name="password"
          state={errors.password ? 'error' : ''}
          register={register("password", { required: true })}
          value="admin"
        />
        <button onClick={handleLogin} className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          {t('signin.button')}
        </button>
      </form>
      <div className="absolute top-5 right-5 ">
        <LangSelector />
      </div>
    </div>
  );
}
