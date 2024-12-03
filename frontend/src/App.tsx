import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/ui/navbar";
import { tabs } from "./config/RootTabsConfig";

function App() {
  return (
    <div className="mx-auto h-screen w-screen">
      <div className="fixed top-0 border-b h-16 w-screen">
        <Navbar tabs={tabs} />
      </div>
      <div className="flex w-full h-full pt-16">
        <Routes>
          {tabs.map(({ key, component }) => (
            <Route
              key={`route-component-${key}`}
              path={key}
              element={component}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;
