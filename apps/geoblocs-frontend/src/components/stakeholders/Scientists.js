import React from "react";
import imageOne from "../../assets/img/stakeholders/scientists/11.png";

function Scientists(props) {
  return (
    <div className="flex flex-col items-center justify-center w-full lg:p-20 p-8 bg-[#F9FAF6]">
      {/* title */}
      <p className="text-[25px] md:text-[35px] lg:text-[45px] text-center lg:w-[1000px] md:w-[85%] w-[100%] font-bold">
        Follow the <span className=" text-gBlue">Science</span>
      </p>

      {/* description */}
      <div className="grid items-center justify-center grid-cols-1 py-8 space-y-8 lg:grid-cols-2 lg:flex-row lg:space-x-8 lg:space-y-0">
        <p className="py-12 text-2xl font-medium text-center">
          GEIA is building a global network of individuals, institutions and
          companies that are dedicated to a regenerative futureusing the latest
          in geospatial and on the ground analysis. This coupled with Geoblocs
          NFTs creates a transparent and verifiable system for biosphere
          regeneration.
        </p>
        <img src={imageOne} className="w-[90%] justify-self-center"></img>
      </div>

      <div className="divider"></div>

      <p className="py-12 text-2xl font-bold text-center lg:text-3xl">
        Measuring Ecological Health
      </p>

      <p className="font-medium lg:w-[800px] w-[100%] md:w-[85%]  text-center text-2xl py-12">
        GEIA, through it's platform <span className="text-gGreen">Geoblocs</span>, is bringing together specialists
        from a wide variety of disciplines and backgrounds from
        satellite monitoring platforms to university departments dedicated to the
        observation and restoration of biodiversity.
      </p>
      <p className="font-medium lg:w-[800px] w-[100%] md:w-[85%]  text-center text-2xl py-12">
        Earth observation science, landscape ecology and our ability to
        understand complex ecological systemsare undergoing a technological
        revolution. GEIA is working with communities at the coalface of the
        regenerative movement to makeclimate science and its potential to
        leverage funding for re-gen projects available to the people and markets
        that need it most.
      </p>

      <p className="py-12 text-2xl font-bold text-center lg:text-4xl text-gGreen ">
        We are the re-gen generation
      </p>
    </div>
  );
}

export default Scientists;
