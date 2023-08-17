import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import geiaLogo from "../../assets/img/geia-high-res.png";
import rightArrow from "../../assets/svg/right-arrow.svg";
import communityCentric from "../../assets/svg/community-centric.svg";
import radicalTransparency from "../../assets/svg/radical-transparency.svg";
import decentralization from "../../assets/svg/decentralization.svg";
import solution from "../../assets/img/solution.png";
import registerProject from "../../assets/svg/register-project.svg";
import purchaseGeoblocs from "../../assets/svg/purchase-geoblocs.svg";
import blockchainBg from "../../assets/img/blockchain-bg.png";
import uniqueLogo from "../../assets/img/unique-logo.png";
import fb from "../../assets/svg/fb.svg";
import insta from "../../assets/svg/insta.svg";
import linkedin from "../../assets/svg/linkedin.svg";
import rightArrowG from "../../assets/svg/right-arrow-g.svg";
import Footer from "../../components/Footer";

function Home(props) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* hero outer container */}
      <div className="flex flex-col items-center justify-center w-full p-8 bg-home-image">
        {/* hero inner container */}
        <div className="flex flex-col items-center justify-center py-32 space-y-12">
          {/* title container */}
          <div className="flex flex-col items-center justify-center pt-4 space-y-4 leading-none">
            {/* powered by container */}
            <div className="flex flex-row items-center space-x-4">
              <p className="text-white">Powered By</p>
              <img src={geiaLogo} alt="geia-logo" className="w-20" />
            </div>
            {/* title */}
            <p className="text-[80px] text-white">Bringing radical</p>
            <p className="text-[80px] text-white">transparency to</p>
            <p className="text-[80px] font-bold text-gGreen">
              biosphere regeneration
            </p>
          </div>
          {/* hero description container */}
          <div className="flex flex-col">
            <p className="text-center text-white w-[1200px]">
              Geoblocs blockchain utilizes geospatial technology along with on
              the ground monitoring to create verifiable regeneration projects
              around the world that focus on biodiversity, social impact and
              local economics
            </p>
          </div>
          {/* hero button container */}
          <div className="flex flex-col">
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
          <span className="font-bold text-gGreen">geobloc </span>at a time
        </p>
        {/* outer container */}
        <div className="flex flex-row items-start justify-center pt-12 space-x-32">
          {/* container one */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <img src={communityCentric} className="w-32" />
            <p className="text-xl font-bold text-center">Community Centric</p>
            <p className="font-light text-center w-72">
              Geoblocs funds communities to implement regenerative land use
              practices, restore ecosystems and build resilience against climate
              change.
            </p>
          </div>

          {/* container two */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <img src={radicalTransparency} className="w-32" />
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
            <img src={decentralization} className="w-32" />
            <p className="text-xl font-bold text-center">Decentralization</p>
            <p className="font-light text-center w-72">
              The Geoblocs system matches project supporters and land steward
              stakeholders with the governance of a layer 1 blockchain dedicated
              to ecological health and climate action.
            </p>
          </div>
        </div>
      </div>

      {/* solution container */}
      <div className="flex flex-row items-center justify-center w-full py-16 space-x-24 bg-gGreen">
        <img src={solution} className="w-[500px] rounded-2xl" />
        <div className="flex flex-col items-center justify-center space-y-8">
          <p className="text-3xl font-semibold text-center text-white">
            Our Solution
          </p>
          <p className="font-light text-center text-white w-[400px]">
            Instead of focusing on just carbon, Geoblocs fund communities to
            implement regenerative land use practices, restore ecosystems and
            reverses climate change.
          </p>
        </div>
      </div>

      {/* join us container */}
      <div className="flex flex-col items-center justify-center w-full my-24 space-y-8">
        <p className="text-3xl font-semibold text-center">Join Us</p>
        <p className="font-light text-center w-[800px]">
          GeoBlocs Registry allows land stewards to leverage theirecosystem
          services to buyers around the world to get funding for land
          regeneration.
        </p>

        {/* outer container */}
        <div className="flex flex-row pt-10 space-x-20">
          {/* register a project */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <img src={registerProject} className="w-32" />
            <p className="text-xl font-bold text-center">Register a Project</p>
            <p className="font-light text-center w-72">
              Send us information on your regeneration project to see if it
              meets our criteria.
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
            <img src={purchaseGeoblocs} className="w-32" />
            <p className="text-xl font-bold text-center">Purchase Geoblocs</p>
            <p className="font-light text-center w-72">
              Seamlessly purchase, retire, and monitor via the project
              dashboard.
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
      <div className="flex flex-row items-center justify-center w-full py-32 mt-8 space-x-32 custom-bg-blockchain-image">
        <div className="flex flex-col items-center justify-center space-y-8">
          <p className="text-3xl font-semibold text-center">Blockchain</p>
          <p className="font-light text-center w-[600px]">
            The Geoblocs blockchain is a layer 1 blockchain that is dedicated to
            ecological health and climate action. It is a proof of stake
            blockchain that is secured by the validators and is governed by the
            community.
          </p>
        </div>
        <img src={uniqueLogo} className="w-[400px]" />
      </div>

      {/* stay updated container */}
      <div className="flex flex-col items-center justify-center w-full py-16 my-16 space-y-10">
        <p className="text-3xl font-semibold text-center">Stay Updated</p>
        <p className="font-light text-center w-[600px]">
          Sign up to our newsletter to stay up to date with the latest news and
          updates.
        </p>
        <input
          type="text"
          placeholder="Enter your email"
          className="w-[400px] h-12 px-8 text-black  rounded-full outline-none bg-gGray py-2"
        ></input>
        <button className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70">
          <p>Subscribe</p>
          <img src={rightArrow} className="w-4" />
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
