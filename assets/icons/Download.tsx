import React from "react";
import Svg, { G, Path } from "react-native-svg";

const Download = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
      <G
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></G>
      <G id="SVGRepo_iconCarrier">
        <Path
          d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
          stroke="#fafafa"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></Path>
        <Path
          d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487"
          stroke="#fafafa"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></Path>
      </G>
    </Svg>
  );
};

export default Download;
