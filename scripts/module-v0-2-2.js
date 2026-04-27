import { registerRolltableDashboard } from "./rolltable-dashboard-app-v0-2-2.js";

Hooks.once("init", () => {
  registerRolltableDashboard();
});
