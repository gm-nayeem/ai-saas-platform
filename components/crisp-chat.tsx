"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("0e9bcb3b-87b6-432f-b1d8-8d899c86254a");
  }, []);

  return null;
};
