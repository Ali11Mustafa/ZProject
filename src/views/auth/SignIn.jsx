import InputField from "components/fields/InputField";
import LangSelector from "components/langSelector/LangSelector";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function SignIn({ userCredentials }) {
  const navigate = useNavigate();

  let [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((items) => {
      return {
        ...items,
        [name]: value,
      };
    });
  };

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  const { t } = useTranslation();

  const handleLogin = async (data) => {
    setErrors({});
    setErrorMessage("");
    setLoading(true);

    let formdata = new FormData();

    formdata.append("email", inputs.email);
    formdata.append("password", inputs.password);

    try {
      const req = await api.post("/login", formdata, {
        headers: {
          Accept: "application/json",
        },
      });

      const sessStorage = {
        id: req.data.id,
        email: req.data.email,
        name: req.data.name,
        role: req.data.role,
        token: req.data.token,
      };

      sessionStorage.setItem("user", JSON.stringify(sessStorage));
      let usr = JSON.parse(sessionStorage.getItem("user"));
      if (usr.role === "engineer" || usr.role === "officer_eng") {
        navigate("/needs", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
      return;
    } catch (e) {
      console.log(e);
      setErrorMessage(
        "Incorrect email or password. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-2">
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
          type="email"
          name="email"
          state={errors.email ? "error" : ""}
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
          value="admin"
        />
        {errorMessage && (
          <div className="my-4 text-red-500">{errorMessage}</div>
        )}
        <button
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="mr-2 -ml-1 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : (
            t("signin.button")
          )}
        </button>
      </form>
      <div className="absolute top-5 right-5 ">
        <LangSelector />
      </div>
    </div>
  );
}