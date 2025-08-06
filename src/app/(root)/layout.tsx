"use client";

import { FC, ReactNode } from "react";
import Footer from "../components/Pages/Footer/Footer";


interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      {children}
      <Footer/>
    </>
  );
};

export default Layout;