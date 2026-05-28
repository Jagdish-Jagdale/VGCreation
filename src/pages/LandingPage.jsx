import Home from "../components/Home";
import ServicesTicker from "../components/ServicesTicker";
import WhatWeDo from "../components/WhatWeDo";
import Promises from "../components/Promises";
import WhoWeServe from "../components/WhoWeServe";
import ReferClient from "../components/ReferClient";
import WorkWithExperts from "../components/WorkWithExperts";

export default function LandingPage() {
  return (
    <>
      <Home />
      <ServicesTicker />
      <WhatWeDo />
      <Promises />
      <WhoWeServe />
      <ReferClient />
      <WorkWithExperts />
    </>
  );
}
