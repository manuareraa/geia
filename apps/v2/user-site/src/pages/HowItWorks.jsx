import React from "react";
import { useNavigate } from "react-router-dom";

var HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-full max-w-4xl p-4 space-y-8 md:p-8">
        <h1 className="text-2xl font-bold text-center">How it Works</h1>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center md:text-2xl">
            What is Geoblocs
          </h2>
          <p className="text-justify">
            Geoblocs is a blockchain verified biosphere regeneration platform
            that uses Blockchain tokens to represent real land around the world,
            which it then restores using various techniques. A Geobloc is a
            blended impact offset, meaning it looks at a diverse set of
            parameters when assessing and implementing projects. From cultural
            and social aspects to economic and, of course biodiversity. When all
            these parameters are considered, it ensures the long-term viability
            of the projects.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center md:text-2xl">
            How it works, for individuals
          </h2>
          <p className="text-justify">
            First a project is earmarked; then we sign an agreement with the
            landowner/custodian. Then we create a polygon of the area to be
            restored which is uploaded onto several monitoring and assessment
            platforms. Next, individuals and businesses wishing to participate
            purchase* a said amount of the area. At that stage we create the
            Geoblocs. Each one represents 1sq.m of the project. All the
            information about the site and its status i.e., coordinates, land
            condition, restoration type etc. are uploaded onto the blockchain
            and the Geoblocs are generated, at which stage the funds are
            allocated to the project and season permitting* (see planting
            season) work can begin. Purchasers of the Geoblocs can monitor their
            progress through the links embedded in the Geobloc, giving them
            access to constantly updated information on its status.
          </p>
          <p className="italic text-justify">
            *No ownership or sovereign rights to the land are purchased.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center md:text-2xl">
            How it works, for businesses
          </h2>
          <p className="text-justify">
            The client picks a project that suits their business model; this
            could be an agroforestry system in Africa or a rewilding project in
            Ireland for example. Then the required number of Geoblocs is
            generated. These come in the form of an NFT. The appearance can be
            customized to suit the clients wishes i.e., artwork or symbolism
            native to the region being restored, or their own logos, or both.
            These can then be transferred to the clients represented by a QR
            code which can be printed or embedded in digital formats. This code
            is a link to either the client’s page or one generated for them. We
            have the system ready to go whereby each Geobloc is represented by a
            unique QR code, but this is only feasible if the client is using NFT
            ticketing. In this case each Geobloc would be redeemable as a form
            of NFT merchandise that represents the offset value of the ticket.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center md:text-2xl">
            Cost breakdown
          </h2>
          <p className="text-justify">
            Breakdown is as follows; approx. 60-65% goes to the land restoration
            10-15% to GEIA for admin 20% to monitoring. Any excess will be put
            toward increasing the tree growing capacity in the form of nursery
            equipment. As this is a start-up and every site poses different
            problems it is hard to exactly know the cost of each individual
            project. But based on multiple scenarios the above breakdown seems
            accurate, as each project is meticulously monitored and recorded, we
            will know what deficit or excess we will have, but based on our
            research the price of €1 per GEOBLOC is sufficient in most cases to
            cover the regeneration and admin.
          </p>
          <p className="italic text-justify">
            *GEIA is VAT registered in the Republic of Ireland, so a reverse VAT
            charge is applicable to companies outside the state including the
            UK.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center md:text-2xl">
            The land agreement
          </h2>
          <p className="text-justify">
            The landowner never gives up any sovereign rights to the land. As
            GEIA is a for-profit company it is designed to generate revenue;
            this should be viewed as a strong point as without a good and fair
            working relationship with the landowners this model cannot grow, so
            in designing this model we are looking to build a business that
            creates a lasting relationship with the landowners that goes far
            beyond the initial restoration.
          </p>
          <p className="text-justify">
            With regards to penalties should the landowner not keep up their end
            of the bargain, there will be no disciplinary action taken. But the
            individual will be blacklisted on our system, and we will create an
            offset of equal value for the clients of the GEOBLOCS, from a
            contingency we will hold to cover such outcomes. But the hope is
            that this new system will be exponentially more profitable than
            before thus creating an incentive to maintain it.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center md:text-2xl">
            Site monitoring
          </h2>
          <p className="text-justify">
            Monitoring will be carried out in various ways and on an ongoing
            basis, from on the ground to satellite imaging. As we wish to become
            part of the new value chain created by the restoration it will be in
            our interest to make sure the landowner has the resources to
            maintain a healthy landscape, and that in turn it becomes a
            profitable enterprise for them.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center md:text-2xl">
            What makes GEOBLOCS different
          </h2>
          <p className="text-justify">
            There are many differences. Unlike other types of offsets, GEOBLOCS
            for one thing is not just focused on CO2 and is about a whole host
            of services from environmental to social and economic, and because
            each GEOBLOC is on a blockchain we can never sell the same project
            more than once. Our projects will be undertaken with the highest
            level of scrutiny possible and will adhere to a host of standards,
            not just carbon accounting but global biodiversity standards with
            strict planting protocols, human rights, and equality standards to
            ensure the right trees are planted in the right place for the right
            people.
          </p>
          <p className="text-justify">
            Once a project has been earmarked, we in conjunction with expert 3rd
            parties on the ground will assess the site. A polygon will be
            generated and uploaded to our Restor, GFW, and Digifarm accounts, at
            which stage they will take stock of the current state of the land
            and will monitor its progress. We will also take notes on the soil
            type, elevation, aspect, gradient, topography, rainfall patterns,
            and water sources. We also look at local regional and commodity
            markets with regards to produce. These factors are then used to
            generate a working plan. Once we have a plan, work can begin; this
            is carried out by the same 3rd parties who will employ the landowner
            and local workforce to do the work whilst at the same time educating
            them about the maintenance and care.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center md:text-2xl">
            Our ethos
          </h2>
          <p className="text-justify">
            We believe collective action is the answer. If we invest
            collectively in regenerating land and the people who own, work, and
            live on that land, we can stop this extractive mindset from creating
            more oppression in the name of carbon drawdown. Our collective power
            can create abundance for everyone from the value of regenerative
            agriculture, carbon sequestration, and biodiversity regeneration. It
            can create models for a sustainable future that belongs to us all.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
