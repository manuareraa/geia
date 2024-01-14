import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

import Footer from "../../components/Footer";

import geiaLogo from "../../assets/img/geia-high-res.old.png";

var HowItWorks = () => {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center w-full h-screen p-8">
                <h2>How it Works</h2>
                <div>
                    Content coming soon!
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default HowItWorks;