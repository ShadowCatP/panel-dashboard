// TODO Clock widget. Toggling 12/24h format. Analog/Digital variants

import { useEffect, useState } from "react";
import { parseDate } from "../lib/utils";

export const Clock = () => {
  const [is24Format, setIs24Format] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-lexend flex flex-col items-center gap-2 rounded-lg bg-neutral-600 px-8 py-2 text-4xl font-bold text-white">
      <div className="flex gap-2">{parseDate(time, is24Format)}</div>
      <button
        onClick={() => setIs24Format((prev) => !prev)}
        className="w-full cursor-pointer rounded bg-neutral-800 px-3 py-1 text-xl font-light transition-colors hover:bg-neutral-700"
      >
        {is24Format ? "12h" : "24h"}
      </button>
    </div>
  );
};
