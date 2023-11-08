import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import rightArrow from "../../assets/svg/right-arrow.svg";
import Footer from "../../components/Footer";

import imageOne from "../../assets/img/team/11.png";
import imageTwo from "../../assets/img/team/12.png";
import imageThree from "../../assets/img/team/13.png";
import imageFour from "../../assets/img/team/14.png";

function Team(props) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // outer container
    <div className="flex flex-col justify-center w-full">
      {/* title container */}
      <div className="flex flex-col items-center justify-center space-y-8 pt-36">
        {/* title */}
        <p className="font- text-[33px] md:text-[50px] lg:text-[80px]">
          The Team
        </p>

        <div className="flex flex-col items-center justify-center pt-12 pb-16 space-y-8 lg:flex-row lg:space-x-16 lg:space-y-0">
          <p className="w-[85%] pb-6 text-center text-2xl  font-light md:w-[85%] lg:w-[40%]">
            The team behind Geoblocs is a network of individuals, institutions,
            companies, non profits and indigenous groups all with a passion to
            find ways to regenerate our biosphere. Because it is structured this
            way there are low overheads making it possible to use the funds to
            the greatest benefit as each part of the network is only being
            rewarded for work being carried out by them at that time. The entire
            platform is run on the same principle from the IT people to the
            people doing the work on the ground. Geoblocs is administered by
            GEIA who, like all other stakeholders, works on a commission basis.
          </p>

          <img src={imageOne} className="lg:w-[40%] w-[80%]"></img>
        </div>

        {/* title button */}
        <button
          className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
          onClick={() => navigate("/platform/projects")}
        >
          <p>Explore Projects</p>
          <img src={rightArrow} className="w-4" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full px-4 my-24 space-y-16 lg:px-16">
        <p className="font- text-[50px]">Our Values</p>

        {/* transparency */}
        <div className="flex flex-col items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8 lg:flex-row">
          <div className="flex flex-col items-center justify-center space-y-8">
            <p className="text-3xl font-bold text-center">Transparency</p>
            <p className="px-8 text-2xl font-light text-center">
              The Geoblocs system aims to be completely transparent at every
              step of the process ensuring that the maximum benefit is achieved
              and that all stakeholders adhere to the methodology.
            </p>
          </div>

          <img src={imageThree} className="lg:w-[40%] w-[80%]"></img>
        </div>

        {/* innovation */}
        <div className="flex flex-col-reverse items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8 lg:flex-row">
          <img src={imageTwo} className="lg:w-[40%] w-[80%] mt-8 lg:mt-0"></img>
          <div className="flex flex-col items-center justify-center space-y-8">
            <p className="text-3xl font-bold text-center">Innovation</p>

            <p className="px-8 text-2xl font-light text-center">
              Pioneering technology to calculate, monitor and evaluate every
              project down to the m².
            </p>
          </div>
        </div>

        {/* morality */}
        <div className="flex flex-col items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8 lg:flex-row">
          <div className="flex flex-col items-center justify-center space-y-8">
            <p className="text-3xl font-bold text-center">Morality</p>
            <p className="px-8 text-2xl font-light text-center">
              In the coming boom of biosphere reclamation, GEIA stands against
              the monoculture model of carbon sinks and corporate land banks.
              Our projects support people and the land, addressing all of the UN
              Sustainable Development Goals in harmony.
            </p>
          </div>
          <img src={imageFour} className="lg:w-[40%] w-[80%]"></img>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Team;
