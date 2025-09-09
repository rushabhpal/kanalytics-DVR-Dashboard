import { useState } from "react";
import "./App.css";
import SlotsList from "./components/SlotsList";
import logo from "../src/assets/kanalytics.png";

function App() {
  const [selectedKdvr, setSelectedKdvr] = useState("kdvr1");

  return (
    <div className="min-h-screen border-1 border-orange-600 rounded-lg flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-1  border-orange-600 bg-orange-50">
        <img src={logo} alt="Kanalytics Logo" className="h-7 w-auto mr-2" />
        <div className="flex items-center gap-1">
          <select
            value={selectedKdvr}
            onChange={(e) => setSelectedKdvr(e.target.value)}
            className="border border-orange-600 rounded px-3 py-1 text-orange-700 bg-white hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="kdvr1">kdvr1</option>
            <option value="kdvr2">kdvr2</option>
            <option value="kdvr3">kdvr3</option>
            <option value="kdvr4">kdvr4</option>
            <option value="kdvr5">kdvr5</option>
            <option value="kdvr6">kdvr6</option>
            <option value="kdvr7">kdvr7</option>
          </select>
        </div>
      </header>

      {/* Body */}
      <main className="flex-grow  overflow-auto">
        <SlotsList kdvrFilter={selectedKdvr} />
      </main>

     
    </div>
  );
}

export default App;
