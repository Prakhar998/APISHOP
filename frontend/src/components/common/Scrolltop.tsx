/* eslint-disable react-hooks/exhaustive-deps */
import Fab from "@mui/material/Fab";
import { useState, useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ScrollTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 100) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 100) {
      setShowScroll(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);
  return (
    <div>
      {/* your page content */}
      {showScroll && (
        <Fab
          size="small"
          color="default"
          aria-label="scroll-to-top"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          sx={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            borderRadius: "0px",
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      )}
    </div>
  );
};

export default ScrollTop;
