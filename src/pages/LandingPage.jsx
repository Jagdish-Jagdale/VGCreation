import Home from "../components/Home";

import WhatWeDo from "../components/WhatWeDo";
import Promises from "../components/Promises";
import WhoWeServe from "../components/WhoWeServe";
import ReferClient from "../components/ReferClient";
import WorkWithExperts from "../components/WorkWithExperts";

export default function LandingPage() {
  document.title = "Home | Vision Glass Creation";

  return (
    <>
      <Home />

      <WhatWeDo />
      <Promises />
      <WhoWeServe />
      <ReferClient />
      <WorkWithExperts />
    </>
  );
}
