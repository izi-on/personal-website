import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/ui/navbar";
import { tabs } from "./config/RootTabsConfig";

function App() {
  return (
    <div className="mx-auto h-screen w-screen">
      <Navbar tabs={tabs} />
      <Routes>
        {tabs.map(({ key, component }) => (
          <Route path={key} element={component} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
