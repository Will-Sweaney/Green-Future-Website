import React, { useEffect, useState } from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import UserIndexNavbar from "components/Navbars/UserIndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";

// sections for this page
import Intro from "./index-sections/Intro.js";
import Tabs from "./index-sections/Tabs.js";
import Javascript from "./index-sections/Javascript.js";
import Carousel from "./index-sections/Carousel.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }

    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      {isLoggedIn ? <UserIndexNavbar /> : <IndexNavbar />}
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          <Intro />
          <Tabs />
          <Javascript />
          <Carousel />
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default Index;
