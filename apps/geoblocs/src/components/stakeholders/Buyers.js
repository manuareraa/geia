import React from "react";

import wallet from "../../assets/svg/wallet.svg";
import maximize from "../../assets/svg/maximize.svg";
import shield from "../../assets/svg/shield.svg";
import health from "../../assets/svg/health.svg";
import share from "../../assets/svg/share.svg";

function Buyers(props) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-20 bg-gGreen/20">
      {/* title */}
      <p className="text-[45px] text-center w-[1000px]">
        By using <span className="font-bold text-gGreen">Geoblocs</span> you are
        empowering some of the poorest people in the world to regenerate their
        environment for the benefit of us all.
      </p>

      {/* description */}
      <p className="font-light w-[800px] text-center text-lg py-12">
        Buy Geoblocs biosphere restoration tokens and support land stewards
        around the world to sequester carbon, improve biodiversity, and more.
      </p>
      <div className="divider"></div>

      {/* crypto wallet */}
      <div className="flex flex-row items-center justify-center w-full py-16 space-x-0">
        <img src={wallet} className="w-36"></img>
        <div className="flex flex-col items-center justify-center space-y-8">
          <p className="text-3xl font-bold text-center w-[1200px]">
            All your <span className="font-bold text-gGreen">Geoblocs</span> are
            stored in a crypto wallet which can be accessed anytime, anywhere
          </p>
          <p className="text-center w-[1000px]">
            When you purchase Geoblocs and store them in your wallet you can
            access the project any time for up to date information on the status
            of the regeneration from geospatial data and imagery to on the
            ground monitoring and scientific reports.
          </p>
        </div>
      </div>

      {/* maximize impact */}
      <div className="flex flex-row items-center justify-center w-full py-16 space-x-0">
        <div className="flex flex-col items-center justify-center space-y-8">
          <p className="text-3xl font-bold text-center w-[1200px]">
            Maximize Impact
          </p>
          <p className="text-center w-[1000px]">
            By lowering the overall costs of running ecological projects,more
            money rewards land stewards and is invested directlyinto
            environmental impact.
          </p>
        </div>
        <img src={maximize} className="w-36"></img>
      </div>

      {/* promote trust and transparency */}
      <div className="flex flex-row items-center justify-center w-full py-16 space-x-0">
        <img src={shield} className="w-36"></img>
        <div className="flex flex-col items-center justify-center space-y-8">
          <p className="text-3xl font-bold text-center w-[1200px]">
            Promote Trust and Transparency
          </p>
          <p className="text-center w-[1000px]">
            Ecological data is collected based on open source,scientifically
            rigorous methodologies, and independentlyverified and stored on
            Geoblocs Ledger - our decentralized,immutable database.
          </p>
        </div>
      </div>

      {/* improve ecological health */}
      <div className="flex flex-row items-center justify-center w-full py-16 space-x-0">
        <div className="flex flex-col items-center justify-center space-y-8">
          <p className="text-3xl font-bold text-center w-[1200px]">
            Improve Ecological Health
          </p>
          <p className="text-center w-[1000px]">
            In addition to carbon sequestration, Geoblocs biosphere reset
            tokensfocus on a broad set of ecological co-benefits such as
            soilhealth, water quality, and biodiversity, as well as the social
            and economic health of the project.
          </p>
        </div>
        <img src={health} className="w-36"></img>
      </div>

      {/* share your impact */}
      <div className="flex flex-row items-center justify-center w-full py-16 space-x-0">
        <img src={share} className="w-36"></img>
        <div className="flex flex-col items-center justify-center space-y-8">
          <p className="text-3xl font-bold text-center w-[1200px]">
            Share your Impact
          </p>
          <p className="text-center w-[1000px]">
            With Geoblocs you can share your biosphere regeneration story to
            social media or various other promotional material to encourage
            others to join the fight against ecological destruction.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Buyers;
