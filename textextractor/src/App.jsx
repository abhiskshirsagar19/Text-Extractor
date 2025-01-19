import { useState } from "react";
import Tesseract from "tesseract.js";

const App = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const extractText = () => {
    if (!image) return;
    setLoading(true);
    Tesseract.recognize(image, "eng", {
      logger: (info) => console.log(info), // Logs progress
    })
      .then(({ data: { text } }) => {
        setText(text);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const resetApp = () => {
    setImage(null);
    setText("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Text Extractor</h1>
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        {image && (
          <div className="mt-4">
            <img
              src={image}
              alt="Uploaded Preview"
              className="w-full h-auto rounded-md shadow-sm"
            />
          </div>
        )}
        <button
          onClick={extractText}
          disabled={loading}
          className={`w-full mt-4 py-2 px-4 text-white font-semibold rounded-lg ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Extracting..." : "Extract Text"}
        </button>
        <button
          onClick={resetApp}
          className="w-full mt-2 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
        >
          Reset
        </button>
        {text && (
          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-800">
              Extracted Text:
            </h2>
            <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">
              {text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
