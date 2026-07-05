import { foundDestinations } from "@/content/demo/finn/found";
import { lostDestinations } from "@/content/demo/finn/lost";
import { finnProfile } from "@/content/demo/finn/profile";
import type { DemoUser } from "@/lib/types";

export const finnDemoUser: DemoUser = {
  profile: finnProfile,
  found: foundDestinations,
  lost: lostDestinations,
};

export { foundDestinations, lostDestinations, finnProfile };
