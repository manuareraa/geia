import React from "react";

function Scientists(props) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-20 bg-gGreen/20">
      {/* title */}
      <p className="text-[45px] text-center w-[1000px]">Follow Science </p>

      {/* description */}
      <p className="font-light w-[800px] text-center text-md py-12">
        GEIA is building a global network of individuals, institutions and
        companies that are dedicated to a regenerative futureusing the latest in
        geospatial and on the ground analysis. This coupled with Geoblocs NFTs
        creates a transparent and verifiable system for biosphere regeneration.
      </p>
      <div className="divider"></div>

      <p className="py-12 text-3xl font-bold">Measuring Ecological Health</p>

      <p className="font-light w-[800px] text-center text-lg py-6">
        GEIA, through it's platform Geoblocs, is bringing together specialists
        from a wide variety of disciplines and backgrounds from
        satellitemonitoring platforms to university departments dedicated to the
        observation and restoration of biodiversity.
      </p>
      <p className="font-light w-[800px] text-center text-lg py-6">
        Earth observation science, landscape ecology and our ability to
        understand complex ecological system sare undergoing a technological
        revolution. GEIA is working with communities at the coalface of the
        regenerative movement to makeclimate science and its potential to
        leverage funding for re-gen projects available to the people and markets
        that need it most.
      </p>

      <p className="py-12 text-4xl font-bold underline text-gGreen underline-offset-4">
        We are the re-gen generation
      </p>
    </div>
  );
}

export default Scientists;
