import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Importing assets
import geiaLogo from "../assets/img/geia-high-res.old.png";
import rightArrow from "../assets/svg/right-arrow.svg";
import communityCentric from "../assets/svg/community-centric-v2.svg";
import radicalTransparency from "../assets/svg/radical-transparency-v2.svg";
import decentralization from "../assets/svg/decentralization-v2.svg";
import solution from "../assets/img/solution.png";
import registerProject from "../assets/svg/register-project-v2.svg";
import purchaseGeoblocs from "../assets/svg/purchase-geoblocs-v2.svg";
import polygonLogo from "../assets/img/polygon.png";

import { useUserStore } from "../state-management/AppState";

function Home() {
  const navigate = useNavigate();
  const { subscribeByEmail } = useUserStore();
  const [subscriberEmail, setSubscriberEmail] = useState("");

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center w-full p-8 bg-home-image">
        <div className="flex flex-col items-center justify-center pt-10 pb-10 mb-10 space-y-12 rounded-lg width-50">
          <div className="flex flex-col items-center justify-center pt-4 space-y-4 leading-none">
            <p className="text-[33px] font-bold capitalize text-black lg:text-5xl">
              Bringing radical
            </p>
            <p className="text-[33px] font-bold capitalize text-gBlue lg:text-5xl">
              transparency
            </p>
            <p className="hidden text-center text-[33px] font-bold text-black md:flex lg:flex lg:text-5xl">
              to Biosphere Regeneration
            </p>
            <p className="text-center text-[33px] font-bold text-black md:hidden lg:hidden lg:text-5xl">
              to Biosphere
            </p>
            <p className="text-center text-[33px] font-bold text-black md:hidden lg:hidden lg:text-5xl">
              Regeneration
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="p-6 text-center text-2xl font-bold text-white md:w-[80%] md:text-black lg:w-[60%]">
              The Geoblocs platform utilises geospatial technology along with on
              the ground monitoring to create verifiable regeneration projects
              around the world that focus on biodiversity, social impact, and
              local economics.
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row items-center justify-center w-full mr-20 space-x-4">
            <p className="text-sm text-white lg:text-2xl">Powered by</p>
            <img src={geiaLogo} alt="geia-logo" className="w-15 lg:w-25" />
          </div>
          <button
            className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
            onClick={() => navigate("/explore-projects")}
          >
            <p>Explore Projects</p>
            <img src={rightArrow} className="w-4" />
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="flex flex-col items-center justify-center w-full py-24 space-y-8">
        <p className="text-3xl font-semibold text-center">
          Let's rebuild our biosphere one
          <br />
          <span className="font-bold text-gGreen">Geobloc </span>at a time
        </p>
        <div className="flex flex-col items-start justify-center pt-12 space-y-28 lg:flex-row lg:space-x-32 lg:space-y-0">
          <Section
            imgSrc={communityCentric}
            title="Community Centric"
            description="Geoblocs funds communities to implement regenerative land use practices, restore ecosystems and build resilience against climate change."
          />
          <Section
            imgSrc={radicalTransparency}
            title="Radical Transparency"
            description="The Geoblocs system ensures full transparency for every step of the process, which allows project supporters to see where the funds go, whilst tracking the progress of the project."
          />
          <Section
            imgSrc={decentralization}
            title="Decentralization"
            description="The Geoblocs system matches project supporters and land steward stakeholders to ecological health and climate action with the help of the Polygon Blockchain."
          />
        </div>
      </div>

      <SolutionSection />

      <JoinUsSection navigate={navigate} />

      <BlockchainSection />

      <StayUpdatedSection
        subscriberEmail={subscriberEmail}
        setSubscriberEmail={setSubscriberEmail}
        subscribeByEmail={subscribeByEmail}
      />
    </div>
  );
}

// Component for each section in the home page
const Section = ({ imgSrc, title, description }) => (
  <div className="flex flex-col items-center justify-center space-y-6">
    <div className="flex flex-col items-center justify-center h-32">
      <img src={imgSrc} className="w-32" />
    </div>
    <p className="text-xl font-bold text-center">{title}</p>
    <p className="font-light text-center w-72">{description}</p>
  </div>
);

// Component for the solution section
const SolutionSection = () => (
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
        reverse climate change.
      </p>
    </div>
  </div>
);

// Component for the join us section
const JoinUsSection = ({ navigate }) => (
  <div className="flex flex-col items-center justify-center w-full my-24 space-y-8">
    <p className="text-3xl font-semibold text-center">Join Us</p>
    <p className="w-[70%] text-center font-light md:w-[60%] lg:w-[800px]">
      Geoblocs Registry allows land stewards to leverage their ecosystem
      services to buyers around the world to get funding for land regeneration
    </p>
    <div className="flex flex-col items-start pt-10 space-y-28 lg:flex-row lg:space-x-20 lg:space-y-0">
      <JoinUsOption
        imgSrc={registerProject}
        title="Register a Project"
        description="Send us information on your regeneration project to see if it meets our criteria"
        buttonText="Send Info"
        onClick={() => navigate("/contact")}
      />
      <JoinUsOption
        imgSrc={purchaseGeoblocs}
        title="Purchase Geoblocs"
        description="Seamlessly purchase, retire and monitor via the project dashboard"
        buttonText="Purchase"
        onClick={() => navigate("/explore-projects")}
      />
    </div>
  </div>
);

// Component for each join us option
const JoinUsOption = ({ imgSrc, title, description, buttonText, onClick }) => (
  <div className="flex flex-col items-center justify-center space-y-8">
    <div className="flex flex-col items-start h-36">
      <img src={imgSrc} className="w-32" />
    </div>
    <p className="text-xl font-bold text-center">{title}</p>
    <p className="h-20 font-light text-center w-72">{description}</p>
    <button
      className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
      onClick={onClick}
    >
      <p>{buttonText}</p>
      <img src={rightArrow} className="w-4" />
    </button>
  </div>
);

// Component for the blockchain section
const BlockchainSection = () => (
  <div className="flex flex-col items-center justify-center w-full py-32 mt-8 space-y-8 custom-bg-blockchain-image lg:flex-row lg:space-x-32 lg:space-y-8">
    <div className="flex flex-col items-center justify-center space-y-8">
      <p className="text-3xl font-semibold text-center">Blockchain</p>
      <p className="w-[70%] text-center font-medium md:w-[60%] lg:w-[600px]">
        Geoblocs, powered by Polygon, spearheads the transformation of the
        ecological landscape by harnessing the prowess of the Polygon
        blockchain. Delve into the limitless potential of decentralized
        technology with Geoblocs and capitalize on the advanced scalability, low
        transaction fees, and fast confirmations offered by Polygon's highly
        efficient Layer 2 solution within the Ethereum ecosystem.
      </p>
    </div>
    <img src={polygonLogo} className="w-[200px]" />
  </div>
);

// Component for the stay updated section
const StayUpdatedSection = ({
  subscriberEmail,
  setSubscriberEmail,
  subscribeByEmail,
}) => (
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
    />
    <button
      className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
      onClick={async () => {
        await subscribeByEmail(subscriberEmail);
        setSubscriberEmail("");
      }}
    >
      <p>Subscribe</p>
      <img src={rightArrow} className="w-4" />
    </button>
  </div>
);

export default Home;
