import { useState } from "react";

function App() {
  const [imageData, setImageData] = useState();
  const [isSpinner, setIsSpinner] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSpinner(true);
    let prompt = e.target.prompt.value;
    let size = e.target.size.value;
    generateImage(prompt, size);
  };

  const generateImage = async (prompt, size) => {
    try {
      const response = await fetch(
        "http://localhost:5000/openai/generateimage",
        {
          method: "POST",
          headers: {
            // cors: "no-cors",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            size,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("That image could not be generated");
      }

      const data = await response.json();
      setImageData(data.data);
      setIsSpinner(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col w-2/3 h-screen pt-5 mx-auto bg-red-400 rounded-xl ">
      <h1 className="pb-3 text-3xl italic font-bold text-center">
        Try DALL·E 2, a new AI system!
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-3/4 px-8 py-5 m-auto border-2 border-orange-900 shadow-xl rounded-xl bg-sky-500"
      >
        <input
          type="text"
          name="prompt"
          id="prompt"
          className="block w-full py-2 pr-3 mb-8 bg-white border rounded-md shadow-sm placeholder:italic placeholder:text-slate-400 border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
          placeholder="Type image description"
        />
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-1">
            <h3 className="py-3">Select image size</h3>
            <select name="size" id="size" className="border rounded-md">
              <option value="small">Small</option>
              <option value="medium" selected>
                Medium
              </option>
              <option value="large">Large</option>
            </select>
          </div>
          <button className="px-6 py-2 mt-8 text-black rounded-full bg-veryPaleRed hover:bg-darkBlue hover:text-white ">
            Generate
          </button>
        </div>
      </form>
      {!isSpinner ? (
        <div className="flex items-center justify-center h-2/3 ">
          <img
            src={imageData}
            alt="ai generated content"
            className="object-scale-down h-full"
          />
        </div>
      ) : (
        <div class="flex justify-center items-center">
          <div
            class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          ></div>
        </div>
      )}
    </div>
  );
}

export default App;
