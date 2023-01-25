import { NextPage } from "next";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import md5 from "md5";
import { AiOutlineHome } from "react-icons/ai";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signupEmail, dataBase, fbAuth } from "../../models/firebase_auth";
import { getDatabase, ref, child, set } from "firebase/database";

interface SignupType {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Signup: NextPage = () => {
  const router = useRouter();
  const [errorNotice, setErrorNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const methods = useForm<SignupType>({ mode: "onBlur" });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  const password = useRef<string>();
  password.current = watch("password");

  const onSubmit = async (data: SignupType) => {
    try {
      setLoading(true);
      let createdUser = await signupEmail(data.email, data.password);

      await updateProfile(fbAuth.currentUser, {
        displayName: data.name,
        // photoURL: `http://gravatar.com/avatar/${md5(
        //   createdUser.user.email
        // )}?d=identicon`,
      });

      await set(child(ref(dataBase, `user`), createdUser.user.uid), {
        name: createdUser.user.displayName,
        // image: createdUser.user.photoURL,
      });

      setLoading(false);
      alert("회원가입에 성공하였습니다.");
      router.push("/login");
    } catch (error) {
      setErrorNotice(error.message);
      setLoading(false);
    }
  };
  const gotoHome = () => {
    router.push("/home");
  };

  return (
    <SignupContainer>
      <div onClick={gotoHome} className="gohome">
        <AiOutlineHome />
      </div>
      <h2>회원가입</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name</label>
          <input
            name="name"
            type="text"
            {...register("name", { required: true, maxLength: 10 })}
          />
          {errors.name && errors.name.type === "required" && (
            <p>This name field is required</p>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <p>Your input exceed maximum length</p>
          )}
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
          <label>PasswordConfirm</label>
          <input
            name="passwordConfirm"
            type="password"
            {...register("passwordConfirm", {
              required: true,
              validate: (value) => value === password.current,
            })}
          />
          {errors.passwordConfirm &&
            errors.passwordConfirm.type === "required" && (
              <p>This password confirm field is required</p>
            )}
          {errors.passwordConfirm &&
            errors.passwordConfirm.type === "validate" && (
              <p>The passwords do not match</p>
            )}
          {errorNotice && <p>{errorNotice}</p>}

          <button type="submit" disabled={loading}>
            회원가입
          </button>
        </form>
      </FormProvider>
    </SignupContainer>
  );
};

const SignupContainer = styled.div`
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
`;
export default Signup;
