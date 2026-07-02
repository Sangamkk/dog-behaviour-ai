import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../app/api/api";

function ImageAnalysis() {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (file) {

            setSelectedFile(file);
            setImage(URL.createObjectURL(file));
            setResult(null);

        }

    };

    const handleAnalyze = async () => {

        if (!selectedFile) {

            alert("Please upload an image.");
            return;

        }

        setLoading(true);

        const formData = new FormData();

        formData.append("file", selectedFile);

        try {

            const response = await api.post(
                "/predict/image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setResult(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Prediction Failed");

        }

        finally {

            setLoading(false);

        }

    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-14 px-6">

                <div className="max-w-5xl mx-auto">

                    <h1 className="text-5xl font-extrabold text-center">

                        <span className="text-slate-900">
                            Image Behaviour
                        </span>

                        <br />

                        <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                            Analysis
                        </span>

                    </h1>

                    <p className="text-center text-gray-600 text-lg mt-5 max-w-2xl mx-auto">
                        Upload a dog image and let our AI model analyze its
                        facial expression to determine its behavioural state.
                    </p>

                    <div className="mt-12 bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-2xl p-10">

                        {/* Preview */}

                        <div className="border-4 border-dashed border-blue-300 bg-blue-50 rounded-3xl h-96 flex justify-center items-center overflow-hidden hover:bg-blue-100 transition-all duration-300">

                            {image ? (

                                <img
                                    src={image}
                                    alt="Preview"
                                    className="w-full h-full object-contain rounded-2xl"
                                />

                            ) : (

                                <div className="text-center">

                                    <div className="text-7xl">
                                        🐶
                                    </div>

                                    <p className="mt-5 text-gray-500 text-lg">
                                        No Image Selected
                                    </p>

                                </div>

                            )}

                        </div>

                        {/* Upload */}

                        <div className="mt-8 flex justify-center">

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full max-w-md text-sm text-gray-600
                                file:mr-4
                                file:py-3
                                file:px-6
                                file:rounded-xl
                                file:border-0
                                file:bg-blue-600
                                file:text-white
                                file:font-semibold
                                file:hover:bg-blue-700
                                file:cursor-pointer
                                cursor-pointer"
                            />

                        </div>

                        {/* Button */}

                        <div className="mt-10">

                            <button
                                onClick={handleAnalyze}
                                disabled={loading}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold text-lg shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >

                                {loading ? "Analyzing..." : "Analyze Image"}

                            </button>

                        </div>

                        {/* Result */}

                        {result && (

                            <div className="mt-12 rounded-3xl bg-gradient-to-r from-green-50 to-emerald-100 shadow-xl p-8 border border-green-200">

                                <h2 className="text-3xl font-bold text-green-700 flex items-center gap-3">

                                    🐶 Prediction Result

                                </h2>

                                <div className="mt-8 space-y-5">

                                    <div>

                                        <p className="text-gray-600 text-sm">
                                            Behaviour
                                        </p>

                                        <h3 className="text-3xl font-bold capitalize text-slate-800">
                                            {result.behaviour}
                                        </h3>

                                    </div>

                                    <div>

                                        <p className="text-gray-600 text-sm mb-2">
                                            Confidence
                                        </p>

                                        <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">

                                            <div
                                                className="h-4 bg-gradient-to-r from-green-500 to-green-700 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${result.confidence}%`
                                                }}
                                            ></div>

                                        </div>

                                        <p className="mt-3 text-xl font-bold text-green-700">
                                            {result.confidence}%
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-gray-600 text-sm">
                                            AI Interpretation
                                        </p>

                                        <p className="mt-2 text-gray-700 leading-7">
                                            The uploaded dog's facial expression
                                            has been analyzed using the trained
                                            EfficientNet deep learning model.
                                            The predicted behavioural state is
                                            <span className="font-bold text-blue-700">
                                                {" "}{result.behaviour}
                                            </span>
                                            {" "}with a confidence score of
                                            <span className="font-bold text-green-700">
                                                {" "}{result.confidence}%
                                            </span>.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </>
    );
}

export default ImageAnalysis;