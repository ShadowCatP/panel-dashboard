import { Clock } from "./components/Clock";
import { Links } from "./components/Links";
import { Notes } from "./components/Notes";
import { Weather } from "./components/Weather";

export const App = () => {
  return (
    <>
      <Clock />
      <Weather />
      <Notes />
      <Links />
    </>
  );
};
