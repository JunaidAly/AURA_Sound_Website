"use client";
import { Button } from "../ui/Button";
import { Typography } from "../ui/Typography";
import { Icon } from "../ui/Icon";

import { motion } from "framer-motion";
export default function Footer({}) {
  return (
    <footer>
      <a className="logo" href="#">
        aura<span>®</span>
      </a>
      <Typography>Sound, beautifully considered.</Typography>
      <div>
        <span>Independent concept · No products for sale</span>
        <a href="https://junaidaly.vercel.app" target="_blank" rel="noopener">
          Designed & built by Junaid Ali <Icon name="arrow" />
        </a>
      </div>
    </footer>
  );
}
