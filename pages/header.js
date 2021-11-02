import React, { useEffect, useState } from "react";
import { Login } from "./login/Login";
import { Register } from "./login/Register";
import cookieCutter from "cookie-cutter";
import Head from "next/dist/shared/lib/head";

const HeaderTop = (props) => {
  const [user, setUser] = useState("");
  const [ShowLogin, setShowLogin] = useState(false);
  const [ShowRegister, setShowRegister] = useState(false);
  const [Loginstate, setLoginstate] = useState(
    props.Acc,
    ShowLogin,
    setShowLogin,
    ShowRegister,
    setShowRegister,
    Logout
  );
  useEffect(() => {
    const Acc = cookieCutter.get("Acc");
    if (Acc) {
      const fetchUser = async () => {
        const res31 = await fetch("http://localhost:5035/users/" + Acc);
        const data = await res31.json();
        setUser(data);
      };
      fetchUser();
    }
  }, []);
  function Logout() {
    cookieCutter.set("Acc", "");
    setUser("");
    window.location.reload();
  }
  return (
    <>
      <Head></Head>
      <div className="headerTop">
        <div>
          {user ? (
            <>
              <span className="name_user_header">{user && user.name}</span>
              <ul className="option_user">
                <li
                  onClick={() => {
                    router.push("/UserPage");
                  }}
                >
                  {/*  <i className='bx bxs-user'></i> */}
                  <button>cá nhân</button>
                  <span>Thông tin cá nhân</span>
                </li>
                <li onClick={Logout}>
                  {/*  <i className='bx bx-log-out'></i>
        <span>Đăng xuất</span> */}
                  <button>logout</button>
                </li>
              </ul>
            </>
          ) : (
            /*  <i className='bx bx-user-circle icon_cart_user' onClick={() => {
                       setShowLogin(true)
                     }}>
                     
                     </i> */

            <button
              onClick={() => {
                setShowLogin(true);
              }}
            >
              Login
            </button>
          )}
        </div>
        <Login
          show={ShowLogin}
          setShow={setShowLogin}
          setShowRegister={setShowRegister}
          setLoginstate={[
            setLoginstate,
            props.Acc,
            ShowLogin,
            setShowLogin,
            ShowRegister,
            setShowRegister,
            Logout,
          ]}
        />
      </div>
    </>
  );
};
export default HeaderTop;
