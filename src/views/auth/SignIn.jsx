import InputField from "components/fields/InputField";

import { useAuthStore } from "App";
import LangSelector from "components/langSelector/LangSelector";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { TbVariablePlus } from "react-icons/tb";

export default function SignIn({ userCredentials }) {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  let [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target
    console.log(value);
    setInputs(items => {
      return {
        ...items,
        [name]: value
      }
    })


  }


  const [errors, setErrors] = useState({});

  const { register, handleSubmit } = useForm();

  const { t } = useTranslation();

  const handleLogin = async (data) => {
    setErrors({});

    let formdata = new FormData();

    formdata.append("email", inputs.email);
    formdata.append("password", inputs.password);

    try {
      const req = await api.post("/login", formdata, {
        headers: {
          Accept: "application/json",
        },
      });
      const { token } = req.data;
      console.log("token", token);
      console.log(req.data.user_id);


      const sessStorage = {
        id: req.data.id,
        email: req.data.email,
        name: req.data.name,
        role: req.data.role,
        token: req.data.token,
      };

      sessionStorage.setItem("user", JSON.stringify(sessStorage));
      navigate("/", { replace: true });
      return;


    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-2">
      {/* Sign in section */}
      <form
        className=" w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h4 className="mb-10 text-center text-3xl font-medium text-navy-700 dark:text-white">
          {t("signin.title")}
        </h4>

        <InputField
          Onchanged={handleChange}
          variant="auth"
          extra="mb-3"
          label={t("signin.email")}
          placeholder="Email"
          id="email"
          type="text"
          name="email"
          state={errors.email ? "error" : ""}
        // register={register("email", { required: true })}
        />
        {/* Password */}
        <InputField
          Onchanged={handleChange}
          variant="auth"
          extra="mb-3"
          label={t("signin.password")}
          placeholder="****"
          id="password"
          type="password"
          name="password"
          state={errors.password ? "error" : ""}
          // register={register("password", { required: true })}
          value="admin"
        />
        <button

          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          {t("signin.button")}
        </button>
      </form>
      <div className="absolute top-5 right-5 ">
        <LangSelector />
      </div>
    </div>
  );
}