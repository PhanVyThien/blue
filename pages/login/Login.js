import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";

import { Register } from "./Register";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faUserCircle,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

export const Login = ({ show, setShow, setLoginstate, getName }) => {
  const hide = () => {
    setPassword("");
    setEmail("");
    setPassnoity("");
    setShow(false);
  };
  const [ShowModalHide, setShowModalHide] = useState(show);
  const [ShowRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [Passnoity, setPassnoity] = useState("");
  useEffect(() => {
    if (show) document.getElementById("thu").focus();
  }, [show]);
  const router = useRouter();
  const handleSubmit = () => {
    if (email && password) {
      axios
        .post(
          "http://localhost:5035/users/login",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.user._id) {
            cookieCutter.set("Acc", res.data.user._id);
            if (res.data.user.role == "Customer") router.push("/course");
            else router.push("/dashboard");
            /*  setLoginstate[0](setLoginstate[6](data.user.name, setLoginstate[1], setLoginstate[2], setLoginstate[3], setLoginstate[4], setLoginstate[5]));  */
            hide();
            window.location.reload();
          } else {
            setPassnoity("Sai mật khẩu hoặc tài khoản");
          }
        });
    } else {
      setPassnoity("Chưa điền đủ thông tin");
    }
  };
  const Regis = () => {
    hide();
    setShowRegister(true);
  };
  const reshow = (e) => {
    setShow(e);
  };
  return (
    <>
      {show ? (
        <>
          <div className="total" id="total">
            <div
              className="mask_modal_login"
              onClick={() => {
                hide();
              }}
            ></div>

            <div className="container_modal">
              <div className=" header_modal">
                <div className="header_name">
                  <img src="" className="header__img" />
                  <span className="header_name_modal">Đăng Nhập</span>
                </div>
                <div>
                  <div className="header_info_function_add">
                    <a
                      id="close"
                      onClick={() => {
                        hide();
                      }}
                    >
                      <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
                    </a>
                  </div>
                </div>
              </div>
              <div className="modal_content">
                <div className="modal_content_body">
                  <div>
                    <img src="https://p.w3layouts.com/demos_new/template_demo/09-08-2018/fashion_hub-demo_Free/1005640873/web/images/p3.png" />
                  </div>
                  <div className="first_modal_content">
                    {Passnoity !== "" ? (
                      <span className="catch_erro">{Passnoity}</span>
                    ) : (
                      ""
                    )}
                    <div className="first_name">
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        style={{ marginRight: "12px" }}
                      ></FontAwesomeIcon>
                      <div className="first_content_name_detail">
                        <span className="tittle">Tài khoản </span>
                        <input
                          type="text"
                          className="name_input"
                          placeholder="Email ..."
                          id="thu"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="first_name">
                      <FontAwesomeIcon
                        icon={faKey}
                        style={{ marginRight: "12px" }}
                      ></FontAwesomeIcon>
                      <div className="first_content_name_detail">
                        <span className="tittle">Mật khẩu </span>
                        <input
                          type="password"
                          className="name_input"
                          placeholder="Mật khẩu ..."
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="btn_login">
                      {/*   <Link href="/" onClick={handleSubmit}><a>Đăng nhập</a></Link> */}
                      <button onClick={handleSubmit}>Đăng nhập</button>
                    </div>
                    <div className="bottom_modal">
                      <Link href="#">
                        <a>Quên mật khẩu</a>
                      </Link>
                      <span
                        onClick={() => {
                          setShowRegister(true);
                          hide();
                        }}
                      >
                        Đăng ký
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  <Frame>
        <Loginform>
          <Headconten>Đăng nhập<Cancel onClick={()=>hide()}>X</Cancel></Headconten>
          <Div><TextBox  type="text"
              id="role"
              placeholder="Nhập email đăng nhập"
              required
              name="email"
              value={email}
              onChange={handleChange()}
              /></Div>
          <Div><TextBox  type="text"
              id="role"
              placeholder="nhập mật khẩu"
              required
              value={password}
              name="password"onChange={handleChange()}
              /></Div>
            
          <Div><Label style={{float: 'left',marginLeft: '50px'}}>quên mật khẩu?</Label><Label style={{float: 'right',marginRight: '54px'}} onClick={()=>Regis()}>Tạo tài khoản</Label></Div>
          <Div><LoginButton onClick={handleSubmit}>Đăng nhập</LoginButton></Div>
          <H6>{Passnoity}</H6>
        </Loginform>
      </Frame>  */}
        </>
      ) : null}
      <Register show={ShowRegister} reshow={reshow} setShow={setShowRegister} />
    </>
  );
};
