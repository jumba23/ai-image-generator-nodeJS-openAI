import { useState } from "react";

function App() {
  const [imageData, setImageData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    let prompt = e.target.prompt.value;
    let size = e.target.size.value;

    if (!prompt) {
      return alert("You must enter image description");
    } else {
      generateImage(prompt, size);
      setIsLoading(true);
    }
  };

  const generateImage = async (prompt, size) => {
    try {
      const response = await fetch(
        "http://localhost:5000/openai/generateimage",
        {
          method: "POST",
          headers: {
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
      setIsLoading(false);
      setImageData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col w-2/3 h-screen pt-3 mx-auto bg-red-400 rounded-xl ">
      <h1 className="text-3xl italic font-bold text-center ">
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
            <h3 className="py-1">Select image size</h3>
            <select name="size" id="size" className="border rounded-md">
              <option value="small">Small</option>
              <option value="medium" selected>
                Medium
              </option>
              <option value="large">Large</option>
            </select>
          </div>
          {!isLoading ? (
            <button className="px-6 py-2 mt-8 text-black rounded-full bg-veryPaleRed hover:bg-darkBlue hover:text-white ">
              Generate
            </button>
          ) : (
            <button className="px-6 py-2 mt-8 text-black rounded-full bg-veryPaleRed hover:bg-darkBlue hover:text-white ">
              <svg
                className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              Loading
            </button>
          )}
        </div>
      </form>
      <div className="flex items-center justify-center h-2/3 ">
        {!isLoading ? (
          <img
            src={imageData}
            alt="ai generated content"
            className="object-scale-down h-full pb-2"
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;

// <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm ">
//   <div class="flex items-center justify-center">
//     <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
//       Loading ...
//     </svg>
//   </div>
// </div>
