function App() {
  return (
    <div className="w-2/3 h-screen pt-5 mx-auto border-2">
      <h1 className="p-3 text-3xl font-bold text-center">
        Try DALL·E 2, a new AI system!
      </h1>
      <form className="flex flex-col items-center w-2/3 m-auto border-2">
        {/* <div className="flex flex-col mx-auto"> */}
        <input
          type="text"
          name="prompt"
          id="prompt"
          className="block w-full py-2 pr-3 bg-white border rounded-md shadow-sm placeholder:italic placeholder:text-slate-400 border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
          placeholder="Type image description"
        />
        <div className="fex ">
          <select name="size" id="size">
            <option value="small">Small</option>
            <option value="medium" selected>
              Medium
            </option>
            <option value="large">Large</option>
          </select>
        </div>
        <button className="px-6 py-2 text-black rounded-full bg-veryPaleRed hover:bg-darkBlue hover:text-white ">
          Generate
        </button>
        {/* </div> */}
      </form>
    </div>
  );
}

export default App;
