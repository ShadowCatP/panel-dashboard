import { Clock } from "./components/Clock/Clock";
import { Links } from "./components/Links/Links";
import { Notes } from "./components/Notes/Notes";
import { Weather } from "./components/Weather/Weather";

export const App = () => {
  return (
    <div className="grid min-h-screen w-full place-content-center">
      <Clock />
      <Weather />
      <Notes />
      <Links />
    </div>
  );
};
