import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

import geiaLogo from "../../assets/img/geia-high-res.old.png";
import rightArrow from "../../assets/svg/right-arrow.svg";
import communityCentric from "../../assets/svg/community-centric-v2.svg";
import radicalTransparency from "../../assets/svg/radical-transparency-v2.svg";
import decentralization from "../../assets/svg/decentralization-v2.svg";
import solution from "../../assets/img/solution.png";
import registerProject from "../../assets/svg/register-project-v2.svg";
import purchaseGeoblocs from "../../assets/svg/purchase-geoblocs-v2.svg";
import blockchainBg from "../../assets/img/blockchain-bg.png";
import uniqueLogo from "../../assets/img/unique-logo.png";
import fb from "../../assets/svg/fb.svg";
import insta from "../../assets/svg/insta.svg";
import linkedin from "../../assets/svg/linkedin.svg";
import rightArrowG from "../../assets/svg/right-arrow-g.svg";
import Footer from "../../components/Footer";
import toast from "react-hot-toast";

function Home(props) {
  const navigate = useNavigate();
  const { addNewSubscriber } = useContext(AppContext);
  const [subscriberEmail, setSubscriberEmail] = useState("");

  const addNewSubscriberLocal = async () => {
    if (subscriberEmail === "") {
      toast.error("Please enter your email");
      return;
    }
    const response = await addNewSubscriber(subscriberEmail);
    if (response === true) {
      setSubscriberEmail("");
    } else {
      toast.error("Something went wrong");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* hero outer container */}
      <div className="flex flex-col items-center justify-center w-full h-screen p-8 bg-home-image">
        {/* hero inner container */}
        <div className="flex flex-col items-center justify-center pt-20 pb-20 space-y-12">
          {/* title container */}
          <div className="flex flex-col items-center justify-center pt-4 space-y-4 leading-none">
            {/* powered by container */}
            {/* <div className="flex flex-row items-center space-x-4">
              <p className="text-sm text-white lg:text-lg">Powered By</p>
              <img src={geiaLogo} alt="geia-logo" className="w-12 lg:w-20" />
            </div> */}
            {/* title */}
            <p className="text-[33px] font-bold capitalize text-black lg:mt-20 lg:text-5xl">
              Bringing radical
            </p>
            <p className="text-[33px] font-bold capitalize text-gBlue lg:text-5xl">
              transparency
            </p>
            <p className="hidden text-center text-[33px]  font-bold text-black md:flex lg:flex lg:text-5xl">
              to Biosphere Regeneration
            </p>
            <p className="text-center text-[33px] font-bold text-black md:hidden lg:hidden lg:text-5xl">
              to Biosphere
            </p>
            <p className="text-center text-[33px] font-bold text-black md:hidden lg:hidden lg:text-5xl">
              Regeneration
            </p>
          </div>
          {/* hero description container */}
          <div className="flex flex-col items-center">
            <p className="rounded-2xl bg-[#303D0C]/30 p-6 text-center text-2xl font-bold text-white md:w-[80%] lg:w-[60%]">
              The Geoblocs platform utilises geospatial technology along with on
              the ground monitoring to create verifiable regeneration projects
              around the world that focus on biodiversity, social impact, and
              local economics.
            </p>
          </div>

          {/* hero button container */}
          <div className="flex flex-col space-y-4">
            {/* powered by container */}
            <div className="flex flex-row items-center justify-center w-full mr-20 space-x-4 pt-">
              <p className="text-sm text-white lg:text-2xl">Powered By</p>
              <img src={geiaLogo} alt="geia-logo" className="w-15 lg:w-25" />
            </div>

            <button
              className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
              onClick={() => navigate("/platform/projects")}
            >
              <p>Explore Projects</p>
              <img src={rightArrow} className="w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* community - radical - decentralization container */}
      <div className="flex flex-col items-center justify-center w-full py-24 space-y-8">
        <p className="text-3xl font-semibold text-center">
          Let's rebuild our biosphere one<br></br>
          <span className="font-bold text-gGreen">Geobloc </span>at a time
        </p>
        {/* outer container */}
        <div className="flex flex-col items-start justify-center pt-12 space-y-28 lg:flex-row lg:space-x-32 lg:space-y-0">
          {/* container one */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex flex-col items-center justify-center h-32">
              <img src={communityCentric} className="w-32" />
            </div>
            <p className="text-xl font-bold text-center">Community Centric</p>
            <p className="font-light text-center w-72">
              Geoblocs funds communities to implement regenerative land use
              practices, restore ecosystems and build resilience against climate
              change.
            </p>
          </div>

          {/* container two */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex flex-col items-center justify-center h-32">
              <img src={radicalTransparency} className="w-32" />
            </div>
            <p className="text-xl font-bold text-center">
              Radical Transparency
            </p>
            <p className="font-light text-center w-72">
              The Geoblocs system ensures full transparency for every step of
              the process, which allows project supporters to see where the
              funds go, whilst tracking the progress of the project.
            </p>
          </div>

          {/* container three */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex flex-col items-center justify-center h-32">
              <img src={decentralization} className="w-32" />
            </div>
            <p className="text-xl font-bold text-center">Decentralization</p>
            <p className="font-light text-center w-72">
              The Geoblocs system matches project supporters and land steward
              stakeholders to ecological health and climate action with the help
              of the Unique Network Parachain.
            </p>
          </div>
        </div>
      </div>

      {/* solution container */}
      <div className="flex flex-col items-center justify-center w-full py-16 space-y-8 bg-gGreen lg:flex-row lg:space-x-24 lg:space-y-0">
        <img
          src={solution}
          className="w-[60%] rounded-2xl md:w-[60%]  lg:w-[500px]"
        />
        <div className="flex flex-col items-center justify-center space-y-8">
          <p className="text-3xl font-semibold text-center text-white md:text-3xl lg:text-3xl">
            Our Solution
          </p>
          <p className="w-[70%] text-center font-medium text-white md:w-[400px] lg:w-[400px]">
            Instead of focusing on just carbon, Geoblocs fund communities to
            implement regenerative land use practices, restore ecosystems and
            reverses climate change.
          </p>
        </div>
      </div>

      {/* join us container */}
      <div className="flex flex-col items-center justify-center w-full my-24 space-y-8">
        <p className="text-3xl font-semibold text-center">Join Us</p>

        <p className="w-[70%] text-center font-light md:w-[60%] lg:w-[800px]">
          Geoblocs Registry allows land stewards to leverage theirecosystem
          services to buyers around the world to get funding for land
          regeneration
        </p>

        {/* outer container */}
        <div className="flex flex-col items-start pt-10 space-y-28 lg:flex-row lg:space-x-20 lg:space-y-0">
          {/* register a project */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="flex flex-col items-start h-36">
              <img src={registerProject} className="w-32" />
            </div>
            <p className="text-xl font-bold text-center">Register a Project</p>
            <p className="h-20 font-light text-center w-72">
              Send us information on your regeneration project to see if it
              meets our criteria
            </p>
            <button
              className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
              onClick={() => navigate("/new-application")}
            >
              <p>Apply</p>
              <img src={rightArrow} className="w-4" />
            </button>
          </div>

          {/* purchase geoblocs */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="flex flex-col items-start h-36">
              <img src={purchaseGeoblocs} className="w-32" />
            </div>
            <p className="text-xl font-bold text-center">Purchase Geoblocs</p>
            <p className="h-20 font-light text-center w-72">
              Seamlessly purchase, retire and monitor via the project dashboard
            </p>
            <button
              className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
              onClick={() => navigate("/platform/projects")}
            >
              <p>Purchase</p>
              <img src={rightArrow} className="w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* blockchain container */}
      <div className="flex flex-col items-center justify-center w-full py-32 mt-8 space-y-8 custom-bg-blockchain-image lg:flex-row lg:space-x-32 lg:space-y-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          <p className="text-3xl font-semibold text-center">Blockchain</p>
          <p className="w-[70%] text-center font-medium md:w-[60%] lg:w-[600px]">
            Geoblocs, powered by Unique Network, is helping to revolutionize the
            ecological landscape. Leveraging Unique Network's Polkadot-based
            main parachain. Explore the endless possibilities of decentralized
            technology with Geoblocs and benefit from the robust features of a
            mature Layer 1 blockchain within the Polkadot ecosystem.
          </p>
        </div>
        <img src={uniqueLogo} className="w-[400px]" />
      </div>

      {/* stay updated container */}
      <div className="flex flex-col items-center justify-center w-full py-16 my-16 space-y-10">
        <p className="text-3xl font-semibold text-center">Stay Updated</p>
        <p className="w-[70%] text-center font-light md:w-[60%] lg:w-[600px]">
          Sign up to our newsletter to stay up to date with the latest news and
          updates
        </p>
        <input
          type="text"
          placeholder="Enter your email"
          className="h-12 w-[70%] rounded-full bg-gGray px-8 py-2  text-black outline-none md:w-[60%] lg:w-[400px]"
          value={subscriberEmail}
          onChange={(e) => setSubscriberEmail(e.target.value)}
        ></input>
        <button
          className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
          onClick={() => {
            addNewSubscriberLocal();
          }}
        >
          <p>Subscribe</p>
          <img src={rightArrow} className="w-4" />
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
