import { Clock } from "./components/widgets/Clock/Clock";
import { Links } from "./components/widgets/Links/Links";
import { Notes } from "./components/widgets/Notes/Notes";
import { Weather } from "./components/widgets/Weather/Weather";

export const App = () => {
  return (
    <div className="mx-auto grid w-full place-content-center px-2">
      <div className="grid min-h-screen w-full grid-cols-3 place-content-center gap-3">
        <Clock />
        <Weather />
        <Notes />
        <Links />
      </div>
    </div>
  );
};
