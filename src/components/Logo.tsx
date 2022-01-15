import React from "react";
import uberLogo from "../images/logo.svg";

type ILogo = {
  logo: string;
  alt: string;
  size: number;
};

export const Logo: React.FC<ILogo> = ({ size = 52, logo, alt }) => {
  return <img src={logo} className={`w-${size} mb-10`} alt={alt} />;
};
