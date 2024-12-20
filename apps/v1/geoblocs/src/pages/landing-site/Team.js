import React from "react";

import rightArrow from "../../assets/svg/right-arrow.svg";
import Footer from "../../components/Footer";

function Team(props) {
  return (
    // outer container
    <div className="flex flex-col justify-center w-full">
      {/* title container */}
      <div className="flex flex-col items-center justify-center pt-64 space-y-8">
        {/* title */}
        <p className="font- text-[80px]">The Team</p>

        <p className="pb-6 font-light text-center w-[1200px]">
          The team behind Geoblocs is a network of individuals, institutions,
          companies, non profits and indigenous groups all with a passion to
          find ways to regenerate our biosphere. Because it is structured this
          way there are low overheads making it possible to use the funds to the
          greatest benefit as each part of the network is only being rewarded
          for work being carried out by them at that time. The entire platform
          is run on the same principal from the IT people to the people doing
          the work on the ground. Geoblocs is administered by GEIA who, like all
          other stakeholders works on a commission basis.
        </p>

        {/* title button */}
        <button className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70">
          <p>Explore Projects</p>
          <img src={rightArrow} className="w-4" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full space-y-16 my-28">
        <p className="font- text-[50px]">Our Value</p>

        <p className="text-3xl font-bold text-center">Transparency</p>

        <p className="font-light text-center w-[1200px]">
          The Geoblocs system aims to be completely transparent at every step of
          the process ensuring that the maximum benefit is achieved and that all
          stakeholders adhere to the methodology.
        </p>

        <p className="text-3xl font-bold text-center">Innovation</p>

        <p className="font-light text-center w-[1200px]">
          Pioneering technology to calculate, monitor and evaluate every project
          down to the m².
        </p>

        <p className="text-3xl font-bold text-center">Morality</p>

        <p className="font-light text-center w-[1200px]">
          In the coming boom of biosphere reclamation, GEIA stands against the
          monoculture model of carbon sinks and corporate land banks. Our
          projects support people and the land, addressing all of the UN
          Sustainable Development Goals in harmony.
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default Team;
