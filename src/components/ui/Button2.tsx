import React from "react";

export function Button2({
  frontText = "OUR CONCEPT",
  topText = "OUR CONCEPT",
  icon = null,
  onClick = () => {},
  disabled = false,
  className = "",
}) {
  // Handle click only if not disabled
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <div className={`button-icon ${disabled ? "disabled" : ""} ${className}`} onClick={handleClick}>
      {/* Optional icon rendering */}
      {icon && (
        <div className="icon">
          <svg viewBox="0 0 24 24">{icon}</svg>
        </div>
      )}

      <div className="cube">
        <span className="side front font-gradualSemibold text-[#403A34]">{frontText}</span>
        <span className="side top font-gradualSemibold">{topText}</span>
      </div>

      {/* Four square dots in each corner */}
      <div className="corner-dot top-left"></div>
      <div className="corner-dot top-right"></div>
      <div className="corner-dot bottom-left"></div>
      <div className="corner-dot bottom-right"></div>
    </div>
  );
}
