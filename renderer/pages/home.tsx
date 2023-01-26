import React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import type { NextPage } from "next";
import { HiHeart } from "react-icons/hi";

const Home: NextPage = () => {
  return (
    <HomeContainer>
      <Head>
        <title>home | 마음의 소리</title>
      </Head>

      <div className="logoAlign">
        <HiHeart className="logo" />
        <h1>마음의 소리</h1>
      </div>

      <div className="content">
        <Link href="/login">
          <button>로그인</button>
        </Link>
        <Link href="/signup">
          <button>회원가입</button>
        </Link>
      </div>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #566270;

  .logoAlign {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      text-align: center;
      font-size: 50px;
      font-weight: 900;
      color: #fffff3;
    }
    .logo {
      color: pink;
      text-align: center;
      font-size: 200px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    button {
      border: none;
      padding: 10px;
      border-radius: 10px;
      background-color: #e0e3da;
      font-weight: 600;
      width: 300px;
      margin: 10px;
      color: #566270;

      :hover {
        background-color: #4a5461;
      }
    }
  }
`;

export default Home;
