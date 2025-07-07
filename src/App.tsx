import PaneGrid from "./components/PaneGrid";

function App() {
  return (
    <div className="p-4">
      <main className="flex items-center justify-center">
        <div className="max-md:flex max-md:flex-col max-md:items-center w-[50rem] xl:w-[74rem]">
          <h1 className="text-6xl md:text-7xl font-bold mb-16 mt-5">
            Music Monday
          </h1>
          <PaneGrid />
        </div>
      </main>
    </div>
  );
}

export default App;
