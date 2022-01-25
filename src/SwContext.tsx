import React from "react";
import { Workbox } from "workbox-window";

export const wb = new Workbox("/sw.js");

wb.register();

export const ServiceWorkerContext = React.createContext(wb);
