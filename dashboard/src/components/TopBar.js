import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  return (
    <div
      className="topbar-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left: Indices */}
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{100.2}</p>
          <p className="percent"></p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{100.2}</p>
          <p className="percent"></p>
        </div>
      </div>

      {/* Right: Name + Menu */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <span
          style={{
            fontWeight: "500",
            color: "#444",
            fontSize: "14px",
          }}
        >
          by Rakesh Dhakharwal
        </span>

        <Menu />
      </div>
    </div>
  );
};

export default TopBar;
