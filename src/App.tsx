import { Clock } from "./components/Clock";
import { Links } from "./components/Links";
import { Notes } from "./components/Notes";
import { Weather } from "./components/Weather";

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
