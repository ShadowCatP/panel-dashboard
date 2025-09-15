// TODO Clock widget. Toggling 12/24h format. Analog/Digital variants

import { useEffect, useState } from "react";

export const Clock = () => {
  const [is24Format, setIs24Format] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-lexend rounded-lg bg-neutral-600 px-8 py-2 text-4xl font-bold text-white">
      <div className="flex gap-2">
        {is24Format
          ? time.getHours().toString().padStart(2, "0")
          : (time.getHours() % 12 || 12).toString().padStart(2, "0")}
        :{time.getMinutes().toString().padStart(2, "0")}:
        {time.getSeconds().toString().padStart(2, "0")}
        {!is24Format && <span>{time.getHours() >= 12 ? "PM" : "AM"}</span>}
      </div>
      <button
        onClick={() => setIs24Format((prev) => !prev)}
        className="w-full cursor-pointer rounded bg-neutral-800 px-3 py-1 text-xl font-light transition-colors hover:bg-neutral-700"
      >
        {is24Format ? "12h" : "24h"}
      </button>
    </div>
  );
};
