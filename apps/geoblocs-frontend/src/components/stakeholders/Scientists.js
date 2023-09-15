import React from "react";

function Scientists(props) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-20 bg-gGreen/20">
      {/* title */}
      <p className="text-[25px] md:text-[35px] lg:text-[45px] text-center lg:w-[1000px] md:w-[85%] w-[100%]">
        Follow Science{" "}
      </p>

      {/* description */}
      <p className="font-light lg:w-[800px] w-[100%] md:w-[85%]  text-center text-lg py-12">
        GEIA is building a global network of individuals, institutions and
        companies that are dedicated to a regenerative futureusing the latest in
        geospatial and on the ground analysis. This coupled with Geoblocs NFTs
        creates a transparent and verifiable system for biosphere regeneration.
      </p>
      <div className="divider"></div>

      <p className="py-12 text-2xl font-bold text-center lg:text-3xl">
        Measuring Ecological Health
      </p>

      <p className="font-light lg:w-[800px] w-[100%] md:w-[85%]  text-center text-lg py-12">
        GEIA, through it's platform Geoblocs, is bringing together specialists
        from a wide variety of disciplines and backgrounds from
        satellitemonitoring platforms to university departments dedicated to the
        observation and restoration of biodiversity.
      </p>
      <p className="font-light lg:w-[800px] w-[100%] md:w-[85%]  text-center text-lg py-12">
        Earth observation science, landscape ecology and our ability to
        understand complex ecological systemsare undergoing a technological
        revolution. GEIA is working with communities at the coalface of the
        regenerative movement to makeclimate science and its potential to
        leverage funding for re-gen projects available to the people and markets
        that need it most.
      </p>

      <p className="py-12 text-2xl font-bold text-center underline lg:text-4xl text-gGreen underline-offset-4">
        We are the re-gen generation
      </p>
    </div>
  );
}

export default Scientists;
