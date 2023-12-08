import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        display: "flex",
        gap: "10px",
        background: "#0B0E0D",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        color: "#d8fcf6ca",
        position: "absolute",
        bottom: "0px",
        fontFamily: "monospace",
      }}
    >
      <span
        style={{
          background: "transparent",
        }}
      >
        by Lachicagladiadora
      </span>
      <a
        href="https://github.com/Lachicagladiadora"
        target="_blank"
        style={{
          background: "transparent",
          fontSize: "20px",
          color: "#48c0ac",
        }}
      >
        <FontAwesomeIcon
          icon={faGithub}
          style={{ background: "transparent" }}
        />
      </a>
      <span style={{ background: "transparent" }}>2023</span>
    </footer>
  );
};
