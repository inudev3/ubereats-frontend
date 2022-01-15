import React from "react";
import uberlogo from "../images/logo.svg";
import { Logo } from "./Logo";
import { useMe } from "../hooks/useMe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { Link } from "react-router-dom";
type IHeaderProps = {
  email?: string;
};

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.Me.verified && (
        <div className="bg-red-500 p-3 text-center text-xs text-white">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 flex justify-between items-center max-w-screen-xl mx-auto">
          <Logo logo={uberlogo} alt={"Inuber Eats"} size={40} />
          <span className="text-xs">
            <Link to={"/my-profile"}>
              <FontAwesomeIcon icon={faUser} className={"text-xl"} />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
