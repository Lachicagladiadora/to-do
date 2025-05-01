import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties } from "react";

type FooterProps = {
  style?: CSSProperties;
};

export const Footer = ({ style }: FooterProps) => {
  return (
    <footer
      style={{ ...style }}
      className="w-full bg-black text-teal-lighter flex gap-2 items-center justify-center font-mono text-md"
    >
      by Lachicagladiadora
      <a href="https://github.com/Lachicagladiadora" target="_blank">
        <FontAwesomeIcon icon={faGithub} />
      </a>
      2024
    </footer>
  );
};
