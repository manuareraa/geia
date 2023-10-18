import React from "react";

import wallet from "../../assets/svg/wallet.svg";
import maximize from "../../assets/svg/maximize.svg";
import shield from "../../assets/svg/shield.svg";
import health from "../../assets/svg/health.svg";
import share from "../../assets/svg/share.svg";
import imageOne from "../../assets/img/stakeholders/buyers/11.png";
import imageTwo from "../../assets/img/stakeholders/buyers/15.svg";
import imageThree from "../../assets/img/stakeholders/buyers/12.png";
import imageFour from "../../assets/img/stakeholders/buyers/13.png";
import imageFive from "../../assets/img/stakeholders/buyers/14.png";

function Buyers(props) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-20 bg-gGreen/20">
      {/* title */}
      <p className="text-[25px] md:text-[35px] lg:text-[45px] text-center lg:w-[1000px] md:w-[85%] w-[100%]">
        By using <span className="font-bold text-gGreen">Geoblocs</span> you are
        empowering some of the poorest people in the world to regenerate their
        environment for the benefit of us all.
      </p>

      {/* description */}
      <p className="font-light lg:w-[800px] w-[100%] md:w-[85%]  text-center text-lg py-12">
        Buy Geoblocs biosphere restoration tokens and support land stewards
        around the world tosequester carbon, improve biodiversity, and more.
      </p>

      {/* container */}
      <div className="flex flex-col items-center space-y-8 lg:flex-row lg:space-x-4 lg:space-y-8">
        <p className="text-center">
          When you purchase GEOBLOCS you support land stewards around the world
          to sequester carbon, improve biodiversity, and more.
        </p>
        <img src={imageOne} className="w-[55%]"></img>
      </div>

      <div className="flex flex-col items-center justify-center px-8 py-8 my-12 space-y-4 rounded-lg bg-gGreen/30">
        <p className="text-xl font-bold text-center">
          <span className="text-gGreen">Geoblocs</span> are stored in a crypto
          wallet which can be accessed anytime, anywhere
        </p>
        <div className="flex flex-col items-center pt-8 space-y-8 lg:space-y-0 lg:space-x-8 lg:flex-row">
          <img src={imageTwo} className="w-[30%]"></img>
          <div className="p-2 rounded-lg bg-white/60">
            <p className="text-center">
              When you purchase GEOBLOCS and store them in your wallet you can
              access the project any time for up to date information on the
              status of the regeneration from geospatial data and imagery to on
              the ground monitoring and scientific reports.
            </p>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* crypto wallet */}
      {/* <div className="flex flex-col items-center justify-center w-full py-16 space-y-2 lg:flex-row lg:space-x-0">
        <img src={wallet} className="w-36"></img>
        <div className="flex flex-col items-center justify-center space-y-8">
          <p className="lg:text-3xl md:text-2xl text-xl font-bold text-center lg:w-[1200px] w-[100%] md:[w-85%]">
            All your <span className="font-bold text-gGreen">Geoblocs</span> are
            stored in a crypto wallet which can be accessed anytime, anywhere
          </p>
          <p className="text-center lg:w-[1000px] w-[100%] md:w-[85%]">
            When you purchase Geoblocs and store them in your wallet you can
            access the project any time for up to date information on the status
            of the regeneration from geospatial data and imagery to on the
            ground monitoring and scientific reports.
          </p>
        </div>
      </div> */}

      {/* maximize impact */}
      <div className="flex flex-col items-center justify-center w-full py-16 space-y-2 lg:flex-row lg:space-x-8">
        <div className="flex flex-col items-center justify-center space-y-8 lg:space-y-8 lg:space-x-8 lg:flex-row">
          <div className="flex flex-col space-y-8">
            <p className="text-xl font-bold text-center lg:text-3xl md:text-2xl">
              Maximize <span className="text-gGreen">Impact</span>
            </p>
            <p className="text-center">
              By lowering the overall costs of running ecological projects,more
              money rewards land stewards and is invested directlyinto
              environmental impact.
            </p>
          </div>
          <img src={imageThree} className="w-[50%]"></img>
        </div>
      </div>

      {/* promote trust and transparency */}
      <div className="flex flex-col items-center justify-center w-full py-16 space-y-2 lg:flex-row lg:space-x-8">
        <img src={imageFour} className="w-[50%]"></img>
        <div className="flex flex-col items-center justify-center space-y-8 lg:space-y-8 lg:space-x-8 lg:flex-row">
          <div className="flex flex-col space-y-8">
            <p className="text-xl font-bold text-center lg:text-3xl md:text-2xl">
              Promote <span className="text-gGreen">Trust</span> and
              Transparency
            </p>
            <p className="text-center">
              Ecological data is collected based on open source,scientifically
              rigorous methodologies, and independentlyverified and stored on
              Geoblocs Ledger - our decentralized,immutable database.
            </p>
          </div>
        </div>
      </div>

      {/* improve ecological health */}
      <div className="flex flex-col items-center justify-center w-full py-16 space-y-2 lg:flex-row lg:space-x-8">
        <div className="flex flex-col items-center justify-center space-y-8 lg:space-y-8 lg:space-x-8 lg:flex-row">
          <div className="flex flex-col space-y-8">
            <p className="text-xl font-bold text-center lg:text-3xl md:text-2xl">
              Improve <span className="text-gGreen">Ecological</span> Health
            </p>
            <p className="text-center">
              In addition to carbon sequestration, Geoblocs biosphere reset
              tokensfocus on a broad set of ecological co-benefits such as
              soilhealth, water quality, and biodiversity, as well as the social
              and economic health of the project.
            </p>
          </div>
        </div>
        <img src={imageFive} className="w-[50%]"></img>
      </div>

      {/* share your impact */}
      <div className="flex flex-col items-center justify-center w-full py-16 space-y-2 lg:flex-row lg:space-x-8">
        <div className="flex flex-col items-center justify-center space-y-8 lg:space-y-8 lg:space-x-8 lg:flex-row">
          <div className="flex flex-col space-y-8">
            <p className="text-xl font-bold text-center lg:text-3xl md:text-2xl">
              Share your <span className="text-gGreen">Impact</span>
            </p>
            <p className="text-center">
              With Geoblocs you can share your biosphere regeneration story to
              social media or various other promotional material to encourage
              others to join the fight against ecological destruction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buyers;
