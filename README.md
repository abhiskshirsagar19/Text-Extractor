# Documentation for React Text Extractor Application

## Overview
This application allows users to upload an image, extract text from the image using Optical Character Recognition (OCR), and copy the extracted text to the clipboard. The app is built using React and the Tesseract.js library for OCR functionality.

---

## Key Features
1. **Image Upload**: Users can upload an image from their local system.
2. **Text Extraction**: Text is extracted from the uploaded image using Tesseract.js.
3. **Copy to Clipboard**: Extracted text can be copied to the clipboard.
4. **Reset Functionality**: Users can reset the application to its initial state.

---

## Code Explanation

### State Management
The application uses React's `useState` hook to manage its state:
- `image`: Stores the uploaded image URL.
- `text`: Holds the extracted text.
- `loading`: Indicates whether text extraction is in progress.
- `copySuccess`: Displays a success or failure message after copying text to the clipboard.

### Functions

#### 1. **handleImageUpload**
```javascript
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    setImage(URL.createObjectURL(file));
  }
};
```
- Triggered when a user uploads an image.
- Converts the uploaded image file into a URL and stores it in the `image` state.

#### 2. **extractText**
```javascript
const extractText = () => {
  if (!image) return;
  setLoading(true);
  Tesseract.recognize(image, "eng", {
    logger: (info) => console.log(info),
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
```
- Uses Tesseract.js to perform OCR on the uploaded image.
- Updates the `text` state with the extracted text and sets `loading` to `false` upon completion.

#### 3. **resetApp**
```javascript
const resetApp = () => {
  setImage(null);
  setText("");
  setLoading(false);
  setCopySuccess("");
};
```
- Resets all states to their initial values.

#### 4. **copyToClipboard**
```javascript
const copyToClipboard = () => {
  if (!text) return;
  navigator.clipboard.writeText(text).then(
    () => setCopySuccess("Copied to clipboard!"),
    () => setCopySuccess("Failed to copy text.")
  );
};
```
- Copies the extracted text to the clipboard using the `navigator.clipboard.writeText` API.
- Updates the `copySuccess` state with a success or failure message.

---

## Component Structure

### Parent `<div>`
The main container provides a flexbox layout for centering the content and uses Tailwind CSS for styling.

### Image Upload
```javascript
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
```
- The actual file input is hidden using the `hidden` class.
- A custom-styled `<label>` acts as the trigger for opening the file upload dialog.

### Extract Text Button
```javascript
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
```
- Extracts text from the uploaded image when clicked.
- Displays "Extracting..." while the operation is in progress and disables the button.

### Reset Button
```javascript
<button
  onClick={resetApp}
  className="w-full mt-2 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
>
  Reset
</button>
```
- Resets the application to its initial state.

### Display Extracted Text
```javascript
{text && (
  <div className="mt-4">
    <h2 className="text-lg font-medium text-gray-800">Extracted Text:</h2>
    <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">{text}</p>
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
```
- Displays the extracted text and the "Copy to Clipboard" button if text exists.
- Shows feedback after copying text to the clipboard.

---

## Application Flow
1. **Upload an Image**:
   - The user uploads an image using the file input.
   - The image URL is stored in the `image` state.

2. **Extract Text**:
   - Clicking "Extract Text" starts the OCR process with Tesseract.js.
   - Progress is logged in the console, and the extracted text is displayed when ready.

3. **Copy Text**:
   - Clicking "Copy to Clipboard" copies the extracted text to the user's clipboard.
   - A success or failure message is displayed.

4. **Reset Application**:
   - Clicking "Reset" clears all states and resets the app to its initial state.

---

## Dependencies
1. **React**: Handles the component structure and state management.
2. **Tesseract.js**: Performs OCR on the uploaded image.
3. **Tailwind CSS**: Provides utility-first CSS for styling.

---

## Conclusion
This application demonstrates how to integrate OCR functionality into a React app using Tesseract.js. The code includes features like file upload, text extraction, clipboard copy, and reset functionality, ensuring a user-friendly and accessible interface.

