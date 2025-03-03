import React, { useState, useEffect, useRef } from "react";

const Overton = () => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const windowWidth = 300;

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const terms = [
    // Far Left
    { text: "socialism", freq: 9 },
    { text: "marxism", freq: 7 },
    { text: "anti-capitalism", freq: 8 },
    { text: "wealth redistribution", freq: 6 },
    { text: "universal basic income", freq: 7 },
    { text: "democratic socialism", freq: 8 },
    { text: "social justice", freq: 9 },
    { text: "radical equity", freq: 5 },
    { text: "abolish prisons", freq: 5 },
    { text: "defund police", freq: 8 },
    { text: "anti-imperialism", freq: 6 },
    { text: "collectivism", freq: 5 },
    { text: "revolution", freq: 6 },
    { text: "class struggle", freq: 7 },
    { text: "anti-fascism", freq: 8 },

    // Left
    { text: "progressive", freq: 9 },
    { text: "liberal", freq: 10 },
    { text: "green new deal", freq: 8 },
    { text: "medicare for all", freq: 9 },
    { text: "gun control", freq: 8 },
    { text: "public healthcare", freq: 7 },
    { text: "labor unions", freq: 6 },
    { text: "affirmative action", freq: 7 },
    { text: "climate action", freq: 9 },
    { text: "reproductive rights", freq: 8 },
    { text: "gender equality", freq: 7 },
    { text: "sanctuary cities", freq: 6 },
    { text: "voting rights", freq: 8 },
    { text: "LGBTQ+ rights", freq: 7 },
    { text: "income equality", freq: 6 },

    // Center-Left
    { text: "affordable healthcare", freq: 7 },
    { text: "regulated capitalism", freq: 6 },
    { text: "public education", freq: 8 },
    { text: "civil rights", freq: 9 },
    { text: "minimum wage", freq: 8 },
    { text: "social programs", freq: 7 },
    { text: "criminal justice reform", freq: 7 },
    { text: "campaign finance reform", freq: 6 },
    { text: "carbon tax", freq: 5 },
    { text: "diversity initiatives", freq: 7 },

    // Center
    { text: "bipartisanship", freq: 7 },
    { text: "moderate", freq: 8 },
    { text: "compromise", freq: 7 },
    { text: "balanced budget", freq: 6 },
    { text: "mixed economy", freq: 5 },
    { text: "pragmatic", freq: 6 },
    { text: "incremental change", freq: 5 },
    { text: "centrism", freq: 7 },
    { text: "independent", freq: 8 },
    { text: "civic engagement", freq: 6 },
    { text: "diplomacy", freq: 7 },
    { text: "institutional stability", freq: 5 },
    { text: "federalism", freq: 6 },
    { text: "infrastructure", freq: 7 },
    { text: "good governance", freq: 5 },

    // Center-Right
    { text: "fiscal responsibility", freq: 7 },
    { text: "free market", freq: 8 },
    { text: "law and order", freq: 8 },
    { text: "strong military", freq: 7 },
    { text: "school choice", freq: 6 },
    { text: "limited government", freq: 8 },
    { text: "tax reform", freq: 7 },
    { text: "states' rights", freq: 6 },
    { text: "judicial restraint", freq: 5 },
    { text: "personal responsibility", freq: 7 },

    // Right
    { text: "conservative", freq: 10 },
    { text: "republican", freq: 10 },
    { text: "tax cuts", freq: 8 },
    { text: "deregulation", freq: 7 },
    { text: "second amendment", freq: 9 },
    { text: "religious freedom", freq: 8 },
    { text: "pro-life", freq: 9 },
    { text: "traditional values", freq: 7 },
    { text: "border security", freq: 8 },
    { text: "national defense", freq: 7 },
    { text: "energy independence", freq: 6 },
    { text: "anti-socialism", freq: 8 },
    { text: "constitutional originalism", freq: 7 },
    { text: "family values", freq: 6 },
    { text: "school prayer", freq: 5 },

    // Far Right
    { text: "nationalism", freq: 8 },
    { text: "zero tolerance", freq: 6 },
    { text: "america first", freq: 9 },
    { text: "strict constitutionalism", freq: 7 },
    { text: "minimal government", freq: 7 },
    { text: "closed borders", freq: 7 },
    { text: "anti-globalism", freq: 8 },
    { text: "militarism", freq: 6 },
    { text: "traditionalism", freq: 7 },
    { text: "anti-immigration", freq: 8 },
    { text: "culture war", freq: 7 },
    { text: "isolationism", freq: 6 },
    { text: "libertarianism", freq: 7 },
    { text: "individualism", freq: 8 },
    { text: "austerity", freq: 5 },
  ];

  // Position terms across the spectrum
  const positionedTerms = terms.map((term, index) => ({
    ...term,
    position: index / (terms.length - 1), // normalized position between 0 and 1
  }));

  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const container = containerRef.current.getBoundingClientRect();
      const newPosition = Math.max(
        0,
        Math.min(e.clientX - container.left, container.width - windowWidth)
      );
      setSliderPosition(newPosition);
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      const container = containerRef.current.getBoundingClientRect();
      const newPosition = Math.max(
        0,
        Math.min(touch.clientX - container.left, container.width - windowWidth)
      );
      setSliderPosition(newPosition);
    }
  };

  const isInWindow = (position) => {
    const termPixelPosition = position * containerWidth;
    return (
      termPixelPosition >= sliderPosition &&
      termPixelPosition <= sliderPosition + windowWidth
    );
  };

  const getFontSize = (freq) => {
    if (freq >= 9) return "text-lg md:text-xl";
    if (freq >= 7) return "text-base md:text-lg";
    if (freq >= 5) return "text-sm md:text-base";
    return "text-xs md:text-sm";
  };

  const getFontWeight = (freq) => {
    if (freq >= 9) return "font-bold";
    if (freq >= 7) return "font-semibold";
    if (freq >= 5) return "font-medium";
    return "font-normal";
  };

  // Get color based on position in the spectrum
  const getColor = (position) => {
    if (position < 0.4) {
      return "text-blue-400";
    } else if (position > 0.6) {
      return "text-red-400";
    } else {
      return "text-purple-400";
    }
  };

  return (
    <div className="w-screen bg-black text-white p-4">
      <div className="mb-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Overton Window</h2>
        <p className="text-gray-400 text-sm md:text-base">
          Drag the window to explore politically acceptable ideas in public
          discourse
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative h-96 bg-gray-900 rounded-lg cursor-move w-full overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {positionedTerms.map((term, index) => {
          const leftPosition = `${term.position * 100}%`;
          const topPosition = `${20 + Math.random() * 60}%`;
          const visible = isInWindow(term.position);

          return (
            <div
              key={term.text}
              className={`absolute transition-opacity duration-300 ${getFontSize(
                term.freq
              )} ${getFontWeight(term.freq)} ${getColor(term.position)}
                ${visible ? "opacity-100 blur-none" : "opacity-40 blur-sm"}`}
              style={{
                left: leftPosition,
                top: topPosition,
                transform: "translate(-50%, -50%)",
              }}
            >
              {term.text}
            </div>
          );
        })}

        {/* Sliding window - now completely transparent with only a blue border */}
        <div
          className="absolute top-0 h-full w-[300px] border-2 border-blue-500 rounded pointer-events-none"
          style={{ left: sliderPosition }}
        />

        {/* Spectrum labels */}
        <div className="absolute bottom-4 w-full flex justify-between px-4 text-sm font-bold">
          <span className="text-blue-400">Far Left</span>
          <span className="text-red-400">Far Right</span>
        </div>
      </div>

      <div className="mt-4 text-center text-xs md:text-sm text-gray-400">
        Word sizes reflect approximate frequency in public discourse
      </div>
    </div>
  );
};

export default Overton;
