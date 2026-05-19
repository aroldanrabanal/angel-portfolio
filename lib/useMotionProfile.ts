"use client";

import { useEffect, useState } from "react";

/** Mobile / narrow viewports only — avoid treating touch laptops as "lite" on wide screens */
const LITE_MOTION_QUERY = "(max-width: 767px)";

export type MotionProfile = {
  reduceMotion: boolean;
  liteMotion: boolean;
  disableScrollSmoothing: boolean;
};

export function useMotionProfile(reduceMotion: boolean): MotionProfile {
  const [matchesLiteProfile, setMatchesLiteProfile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(LITE_MOTION_QUERY);
    const update = () => setMatchesLiteProfile(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return {
    reduceMotion,
    liteMotion: matchesLiteProfile,
    disableScrollSmoothing: reduceMotion || matchesLiteProfile,
  };
}
