import React from "react";

import Container from "./Container";
import { footerConfig } from "@/config/Footer";

export default function Footer() {
  return (
    <div className="border-t border-b border-currentColor/20">
      <Container className="py-8 border-l border-r border-currentColor/20">
        <div className="flex flex-col items-center justify-center">
          <p className="text-secondary text-center text-sm">
            {footerConfig.text} <b>{footerConfig.developer}</b> <br /> &copy;{" "}
            {new Date().getFullYear()}. {footerConfig.copyright}
          </p>
        </div>
      </Container>
    </div>
  );
}
