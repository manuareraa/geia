import React from "react";

import wallet from "../../assets/svg/wallet.svg";
import maximize from "../../assets/svg/maximize.svg";
import shield from "../../assets/svg/shield.svg";
import health from "../../assets/svg/health.svg";
import share from "../../assets/svg/share.svg";
import imageOne from "../../assets/img/stakeholders/buyers/11.png";
import imageTwo from "../../assets/img/stakeholders/buyers/15.png";
import imageThree from "../../assets/img/stakeholders/buyers/12.png";
import imageFour from "../../assets/img/stakeholders/buyers/13.png";
import imageFive from "../../assets/img/stakeholders/buyers/14.png";

function Buyers(props) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-20 bg-gGreen/20">
      {/* title */}
      <p className="w-[100%] text-center text-[25px] md:w-[85%] md:text-[35px] lg:w-[1000px] lg:text-[45px]">
        By using <span className="font-bold text-gGreen">Geoblocs</span> you are
        empowering some of the poorest people in the world to regenerate their
        environment for the benefit of us all.
      </p>

      {/* description */}
      <p className="w-[100%] py-12 text-center  text-xl md:w-[85%] lg:w-[800px]">
        Buy Geoblocs biosphere restoration tokens and support land stewards
        around the world tosequester carbon, improve biodiversity, and more.
      </p>

      {/* container */}
      <div className="flex flex-col items-center space-y-8 text-xl lg:flex-row lg:space-x-4 lg:space-y-8">
        <p className="text-center">
          When you purchase <span className="text-gGreen">Geoblocs</span> you
          support land stewards around the world to sequester carbon, improve
          biodiversity, and more.
        </p>
        <img src={imageOne} className="w-[55%]"></img>
      </div>

      <div className="mx-44 my-20 flex flex-col items-center justify-center space-y-4 rounded-xl bg-[#B5BFA4] px-8 py-8">
        <div className="mx-36">
          <p className="text-4xl font-bold text-center">
            <span className="text-4xl text-gGreen">Geoblocs</span> are stored in
            a crypto wallet which can be accessed anytime, anywhere
          </p>
        </div>
        <div className="flex flex-col items-center pt-8 space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
          <img src={imageTwo} className="w-[30%]"></img>
          <div className="px-24">
            <div className="rounded-lg bg-[#656565]/30 p-12 px-16">
              <p className="text-3xl text-center text-white">
                When you purchase Geoblocs and store them in your wallet you can
                access the project any time for up to date information on the
                status of the regeneration from geospatial data and imagery to
                on the ground monitoring and scientific reports.
              </p>
            </div>
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
        <div className="flex flex-col items-center justify-center space-y-8 lg:flex-row lg:space-x-8 lg:space-y-8">
          <div className="flex flex-col space-y-8">
            <p className="text-xl font-bold text-center md:text-2xl lg:text-3xl">
              Maximize <span className="text-gGreen">Impact</span>
            </p>
            <p className="text-3xl text-center px-28">
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
        <img src={imageFour} className="w-[80%] h-[80%] object-contain"></img>
        <div className="flex flex-col items-center justify-center space-y-8 lg:flex-row lg:space-x-8 lg:space-y-8">
          <div className="flex flex-col space-y-8">
            <p className="text-xl font-bold text-center md:text-2xl lg:text-3xl">
              Promote <span className="text-gGreen">Trust</span> and
              Transparency
            </p>
            <p className="text-3xl text-center px-28">
              Ecological data is collected based on open source,scientifically
              rigorous methodologies, and independentlyverified and stored on
              Geoblocs Ledger - our decentralized,immutable database.
            </p>
          </div>
        </div>
      </div>

      {/* improve ecological health */}
      <div className="flex flex-col items-center justify-center w-full py-16 space-y-2 lg:flex-row lg:space-x-8">
        <div className="flex flex-col items-center justify-center space-y-8 lg:flex-row lg:space-x-8 lg:space-y-8">
          <div className="flex flex-col space-y-8">
            <p className="text-xl font-bold text-center md:text-2xl lg:text-3xl">
              Improve <span className="text-gGreen">Ecological</span> Health
            </p>
            <p className="text-3xl text-center px-28">
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
        <div className="flex flex-col items-center justify-center space-y-8 lg:flex-row lg:space-x-8 lg:space-y-8">
          <div className="flex flex-col space-y-8">
            <p className="text-xl font-bold text-center md:text-2xl lg:text-3xl">
              Share your <span className="text-gGreen">Impact</span>
            </p>
            <p className="text-3xl text-center">
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
