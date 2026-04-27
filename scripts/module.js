import { registerRolltableDashboard } from "./rolltable-dashboard-app.js";

Hooks.once("init", () => {
  registerRolltableDashboard();
});
