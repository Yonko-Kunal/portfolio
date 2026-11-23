import React from "react";

import Container from "./Container";
import { footerConfig } from "@/config/Footer";

export default function Footer() {
  return (
    <div className="border-currentColor/20 border-t border-b">
      <Container className="border-currentColor/20 border-r border-l py-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-secondary pb-20 text-center text-sm">
            {footerConfig.text} <b>{footerConfig.developer}</b> <br /> &copy;{" "}
            {new Date().getFullYear()}. {footerConfig.copyright}
          </p>
        </div>
      </Container>
    </div>
  );
}
