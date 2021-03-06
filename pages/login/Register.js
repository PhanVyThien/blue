import React from "react";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import cookieCutter from "cookie-cutter";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faUserCircle,
  faKey,
  faAt,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const Frame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  font-family: times, "Times New Roman";
`;
const Loginform = styled.div`
  height: 50%;
  width: 30%;
  background-color: white;
  transform: translate(0px, 30%);
  border-radius: 10px;
`;
const TextBox = styled.input`
  height: 40px;
  width: 300px;
  border-radius: 6px;
  font-size: 120%;
  padding-left: 8px;
  border: 1px solid black;
`;
const Headconten = styled.header`
  font-size: 200%;
  text-align: center;
  text-decoration: none;
  width: 100%;
`;
const Label = styled.a`
  font-size: 100%;
  text-align: center;
  text-decoration: none;
  color: blue;
  cursor: pointer;
`;
const Div = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;
const LoginButton = styled.a`
  padding: 1rem 2rem;
  border-radius: 10px;
  background-color: skyblue;
  border: 0px;
  text-decoration: none;

  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #2690d1;
  }
`;
const Cancel = styled.span`
  font-size: 100%;
  float: right;
  width: 50px;
  height: 50px;
  position: absolute;
  background-color: black;
  border-radius: 50px;
  color: white;
  transform: translate(150px, -70px);
  font-family: Andale Mono, monospace;
  cursor: pointer;
  &:hover {
    color: lightskyblue;
  }
`;
const DIV = styled.div`
  background-color: red;
`;
const H6 = styled.h6`
  color: red;
  padding: 0.25rem 0;
`;
export const Register = ({ show, setShow, reshow }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [validatemessage, setvalidatemessage] = useState("");
  const hide = () => {
    setShow(false);
    setPassword("");
    setEmail("");
    setvalidatemessage("");
    setShow(false);
  };
  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "name") {
      setName(value);
    } else if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    } else if (name == "role") {
      setRole(value);
    }
  };
  function checkEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (re.test(email)) {
      return true;
    }
    setvalidatemessage("?????nh d???ng email kh??ng h???p l???");
    return false;
  }
  function checkPass(pass) {
    if (pass.length > 5) {
      return true;
    } else {
      setvalidatemessage("Password c?? ??t h??n 6 k?? t???");
      return false;
    }
  }
  function staticcheck() {
    if (checkPass(password) && checkEmail(email)) {
      setvalidatemessage("");
      return true;
    }
    return false;
  }
  const handleSubmit = async () => {
    if (name === "" || email === "" || password === "" || rePassword === "") {
      setvalidatemessage("Ch??a nh???p ????? th??ng tin");
    } else if (!staticcheck()) {
      return;
    } else if (password !== rePassword) {
      setvalidatemessage("M???t kh???u kh??ng tr??ng nhau");
    } else {
      const response = await fetch("http://localhost:5035/users/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.exist === 1) setvalidatemessage("Email ???? t???n t???i");
      else if (data.exist === 2) {
        setvalidatemessage("T??n ???? t???n t???i");
      } else {
        hide();
        reshow(true);
      }

      console.log(data.exist);
    }
  };
  /* cookieCutter.set('Acc', response.data.user._id);
       setLoginstate[0](setLoginstate[7](response.data.user.name,setLoginstate[2],setLoginstate[3],setLoginstate[4],setLoginstate[5],setLoginstate[6])); */
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

            <div className="container_modal_register">
              <div className=" header_modal">
                <div className="header_name">
                  <img src="" className="header__img" />
                  <span className="header_name_modal">????ng K??</span>
                </div>
                <div>
                  <div className="header_info_function_add">
                    <i
                      className="bx bx-x modal_icon_exit"
                      id="close"
                      onClick={() => {
                        hide();
                      }}
                    ></i>
                  </div>
                </div>
              </div>
              <div className="modal_content">
                <div className="modal_content_body">
                  <div>
                    <img src="https://p.w3layouts.com/demos_new/template_demo/09-08-2018/fashion_hub-demo_Free/1005640873/web/images/p3.png" />
                  </div>
                  <div className="first_modal_content">
                    {validatemessage !== "" ? (
                      <span className="catch_erro">{validatemessage}</span>
                    ) : (
                      ""
                    )}
                    <div className="first_name">
                      <FontAwesomeIcon
                        icon={faAt}
                        style={{ marginRight: "12px" }}
                      ></FontAwesomeIcon>
                      <div className="first_content_name_detail">
                        <span className="tittle">T??i kho???n </span>
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
                        icon={faUserCircle}
                        style={{ marginRight: "12px" }}
                      ></FontAwesomeIcon>
                      <div className="first_content_name_detail">
                        <span className="tittle">T??n </span>
                        <input
                          type="text"
                          className="name_input"
                          placeholder="T??n t??i kho???n ..."
                          id="thu"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="first_name">
                      <FontAwesomeIcon
                        icon={faKey}
                        style={{ marginRight: "12px" }}
                      ></FontAwesomeIcon>
                      <div className="first_content_name_detail">
                        <span className="tittle">M???t kh???u </span>
                        <input
                          type="password"
                          className="name_input"
                          placeholder="M???t kh???u ..."
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="first_name">
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{ marginRight: "12px" }}
                      ></FontAwesomeIcon>
                      <div className="first_content_name_detail">
                        <span className="tittle">Nh???p l???i m???t kh???u </span>
                        <input
                          type="password"
                          className="name_input"
                          placeholder="Nh???p l???i m???t kh???u ..."
                          onChange={(e) => setRePassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="btn_login">
                      {/*   <Link href="/" onClick={handleSubmit}><a>????ng nh???p</a></Link> */}
                      <button onClick={handleSubmit}>????ng K??</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Frame>
        <Loginform>
          <Headconten>????ng k??<Cancel onClick={()=>hide()}>X</Cancel></Headconten>
          <Div><TextBox  type="text"
              id="role"
              placeholder="Nh???p email"
              required
              name="email"
              onChange={handleChange()}
              /></Div>
          <Div><TextBox  type="text"
              id="role"
              placeholder="Nh???p t??n ????ng nh???p"
              required
              name="name"
              onChange={handleChange()}
              /></Div>
          <Div><TextBox  type="text"
              id="role"
              placeholder="M???t kh???u"
              required
              name="password"
              onChange={handleChange()}
              /></Div>
          <H6>{validatemessage}</H6>
          <Div><LoginButton onClick={handleSubmit} >????ng k??</LoginButton></Div>
        </Loginform>
      </Frame> */}
        </>
      ) : null}
    </>
  );
};
