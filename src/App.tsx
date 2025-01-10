import { useState } from "react";
import MultiSelectDropdown from "./components/MultiSelectDropdown";
import EVENTS, { SelectedEvent } from "./events";

function App() {
  const [selected, setSelected] = useState<SelectedEvent[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(JSON.stringify(selected.map((event) => event.id).join(", ")));
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <MultiSelectDropdown
        id="events-selector"
        label="Events"
        options={EVENTS}
        selected={selected}
        setSelected={setSelected} />
      <button className="bg-gray-500 text-white px-4 py-2 rounded-md">Submit</button>
    </form>
  )
}

export default App
