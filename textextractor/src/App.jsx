import { useState } from "react";
import Tesseract from "tesseract.js";

const App = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

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
    setCopySuccess("");
  };

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(
      () => setCopySuccess("Copied to clipboard!"),
      () => setCopySuccess("Failed to copy text.")
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Text Extractor</h1>
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
        <div className="relative w-full">
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label
            htmlFor="fileInput"
            className="block w-full py-3 px-4 text-center text-white font-semibold bg-blue-600 rounded-lg shadow-lg cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Upload Image
          </label>
        </div>
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
            <button
              onClick={copyToClipboard}
              className="mt-2 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
            >
              Copy to Clipboard
            </button>
            {copySuccess && (
              <p className="mt-2 text-sm text-gray-500">{copySuccess}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
