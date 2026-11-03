import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { App } from "./App.js";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

const Root = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

root.render(<Root />);
