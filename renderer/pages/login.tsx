import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { loginEmail } from "../../models/firebase_auth";
interface LoginType {
  email: string;
  password: string;
}
const LoginPage: NextPage = () => {
  const router = useRouter();
  const [errorNotice, setErrorNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const methods = useForm<LoginType>({ mode: "onBlur" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: LoginType) => {
    try {
      setLoading(true);
      loginEmail(data.email, data.password);
      setLoading(false);
      router.push("/chat");
    } catch (error) {
      setErrorNotice(error.message);
      setLoading(false);
    }
  };
  const gotoHome = () => {
    router.push("/home");
  };
  return (
    <LoginContainer>
      <Head>
        <title>home | happy-talk</title>
        <meta name="talk" content="happy talk"></meta>
      </Head>

      <div onClick={gotoHome} className="gohome">
        <AiOutlineHome />
      </div>
      <div>
        <h2>로그인</h2>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && <p>This email field is required</p>}
          <label>Password</label>
          <input
            name="password"
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <p>This password field is required</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p>Password must have at least 6</p>
          )}
          {errorNotice && <p>{errorNotice}</p>}

          <button type="submit" disabled={loading}>
            submit
          </button>
        </form>
      </FormProvider>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #566270;
  color: #fffff3;

  .gohome {
    position: absolute;
    font-size: 35px;
    top: 5px;
    left: 5px;
    cursor: pointer;
  }

  form {
    width: 370px;
    margin: 0 auto;
  }

  h2 {
    font-weight: 700;
    text-align: center;
    padding-bottom: 10px;
  }

  .form {
    background: #0e101c;
    max-width: 400px;
    margin: 0 auto;
  }

  p {
    color: #bf1650;
  }

  p::before {
    display: inline;
    content: "⚠ ";
  }

  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    padding: 10px 15px;
    margin-bottom: 10px;
    font-size: 14px;
  }

  label {
    line-height: 2;
    text-align: left;
    display: block;
    margin: 5px 0;
    font-size: 14px;
    font-weight: 800;
  }

  button {
    border-radius: 5px;
    margin-top: 20px;
  }
  button[type="submit"],
  input[type="submit"] {
    width: 100%;
    color: #a593e0;
    border: none;
    padding: 20px;
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 8px;
  }

  button[type="submit"]:hover,
  input[type="submit"]:hover {
    background: #e0e3da;
  }

  button[type="submit"]:active,
  input[type="button"]:active,
  input[type="submit"]:active {
    transition: 0.3s all;
    transform: translateY(3px);
    border: 1px solid transparent;
    opacity: 0.8;
  }

  input:disabled {
    opacity: 0.4;
  }

  input[type="button"]:hover {
    transition: 0.3s all;
  }

  button[type="submit"],
  input[type="button"],
  input[type="submit"] {
    -webkit-appearance: none;
  }
`;
export default LoginPage;
