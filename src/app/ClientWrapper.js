// app/ClientWrapper.js
"use client";

import ClientLayout from "../components/ClientLayout.js";

export default function ClientWrapper({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
}