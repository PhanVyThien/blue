import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faCog,
  faUser,
  faClipboard,
  faTshirt,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import cookieCutter from "cookie-cutter";

const SiderBarContainer = styled.div`
  margin: 0px;
  padding: 0px;
  width: 250px;
  height: 100%;
  background-color: lightblue;
  flex-direction: column;
  position: fixed;
  display: flex;
  overflow: auto;
  top: 0;
  left: 0;
`;

const SideBar = styled.ul`
  padding: 0;
  height: 100%;
  width: 100%;
  display: block;
  list-style: none;
`;
const SidebarItem = styled.li`
  a {
    text-decoration: none;
    color: black;
  }
  margin-top: 4px;
  align-items: center;
  border-radius: 4px;
  color: black;
  height: 40px;
  padding-top: 10px;
  width: 100%;
  &:hover {
    background-color: lightskyblue;
  }
  padding-left: 20px;
`;
const Section = styled.p`
  border-bottom: 0.5px solid darkblue;
  padding-bottom: 6px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 12px;
`;
const SectionFooter = styled.p`
  border-top: 0.5px solid darkblue;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 190px;
`;
const UserSection = styled.div`
  display: flex;
  align-items: center;
`;
const UserImg = styled.img`
  border-radius: 50px;
  margin: 0 16px;
`;
const UserName = styled.a`
  color: black;
  text-decoration: none;
`;
const logOut = () => {
  console.log("log out");
};

function Sidebar() {
  function sendmail(){

  }
  const [user, setUser] = useState("");
  const logOut = () => {
    cookieCutter.set("Acc", "");
    setUser("");
    window.location.reload();
  };
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
  return (
    <SiderBarContainer>
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "lightskyblue",
          marginTop: 0,
          paddingBottom: 20,
          paddingTop: 20,
        }}
      >
        Header
      </h2>
      <SideBar>
        <Section>Qu???n l??</Section>
        <SidebarItem>
          <a href="/course">
            <FontAwesomeIcon icon={faTshirt} style={{ marginRight: "12px" }} />
            S???n ph???m
          </a>
        </SidebarItem>
        <SidebarItem>
          <a href="/bill">
            <FontAwesomeIcon
              icon={faFileInvoice}
              style={{ marginRight: "12px" }}
            />
            H??a ????n
          </a>
        </SidebarItem>
        <SidebarItem>
          <a href="/dasboard">
            <FontAwesomeIcon
              icon={faClipboard}
              style={{ marginRight: "12px" }}
            />
            Th???ng k??
          </a>
        </SidebarItem>
        <SidebarItem>
          <a href="/user">
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "12px" }} />
            T??i kho???n
          </a>
        </SidebarItem>
        <SectionFooter>T??i kho???n</SectionFooter>
        <UserSection>
          {user ? (
            <div>
              <UserImg
                src="http://localhost:5035/upload/images/default.png"
                width="50px"
                height="50px"
              ></UserImg>
              <UserName href="/setting">{user && user.name}</UserName>
            </div>
          ) : (
            <div>
              <UserImg
                src="http://localhost:5035/upload/images/default.png"
                width="50px"
                height="50px"
              ></UserImg>
              <UserName href="/setting">Admin1</UserName>
            </div>
          )}
        </UserSection>
        <SidebarItem>
          <a href="/setting">
            <FontAwesomeIcon icon={faCog} style={{ marginRight: "12px" }} />
            C??i ?????t
          </a>
        </SidebarItem>
        <SidebarItem>
          <a onClick={logOut}>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              style={{ marginRight: "12px" }}
            />
            ????ng xu???t
          </a>
          
        </SidebarItem>
        <SidebarItem>
          <a href="#" onClick={()=>senmail()}>
            senmail
          </a>
        </SidebarItem>
      </SideBar>
    </SiderBarContainer>
  );
}

export default Sidebar;
