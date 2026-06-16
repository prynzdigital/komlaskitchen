"use client";
import EmbedPopup from "@/components/popup/EmbedPopup";
import ImageView from "@/components/popup/ImageView";
import { foodkingUtility } from "@/utility";
import { Fragment, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

const FoodKingLayout = ({ children }) => {
  useEffect(() => {
    foodkingUtility.scrollAnimation();
    foodkingUtility.stickyNav();
  }, []);

  return (
    <Fragment>
      <ImageView />
      <EmbedPopup />
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

export default FoodKingLayout;
