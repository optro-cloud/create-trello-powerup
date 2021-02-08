import {Trello} from "./types/trello";
import {CapabilityProps} from "./types/power-up";

// Capability Imports Here

const CAPABILITY_PROPS: CapabilityProps = {
  baseUrl: window.location.href.replace(/\/$/, ""),
  icon: {
    dark: "/static/icon-dark.png",
    light: "/static/icon-light.png"
  }
}

window.TrelloPowerUp.initialize({
});
