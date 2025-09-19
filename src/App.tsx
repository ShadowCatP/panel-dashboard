import { Clock } from "./components/widgets/Clock/Clock";
import { Links } from "./components/widgets/Links/Links";
import { Notes } from "./components/widgets/Notes/Notes";
import { Weather } from "./components/widgets/Weather/Weather";

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
