import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../app/api/api";

function MultimodalAnalysis() {

    const [image, setImage] = useState(null);
    const [audio, setAudio] = useState(null);

    const [imagePreview, setImagePreview] = useState(null);
    const [audioPreview, setAudioPreview] = useState(null);

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (file) {

            setImage(file);
            setImagePreview(URL.createObjectURL(file));

        }

    };

    const handleAudio = (e) => {

        const file = e.target.files[0];

        if (file) {

            setAudio(file);
            setAudioPreview(URL.createObjectURL(file));

        }

    };

    const handleAnalyze = async () => {

        if (!image || !audio) {

            alert("Please upload both image and audio.");

            return;

        }

        setLoading(true);

        const formData = new FormData();

        formData.append("image", image);
        formData.append("audio", audio);

        try {

            const response = await api.post(

                "/predict/multimodal",

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
            console.log(error.response);
            console.log(error.response?.data);

            alert(
                error.response?.data?.detail ||
                error.message ||
                "Prediction Failed"
            );
        }

        finally {

            setLoading(false);

        }

    };

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-6">

                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

                    <h1 className="text-4xl font-bold text-center text-slate-800">

                        Multimodal Behaviour Analysis

                    </h1>

                    <p className="text-center text-gray-500 mt-4">

                        Upload both dog image and audio for AI fusion prediction.

                    </p>

                    <div className="grid md:grid-cols-2 gap-10 mt-10">

                        <div>

                            <h2 className="font-semibold mb-4">

                                Dog Image

                            </h2>

                            <input

                                type="file"

                                accept="image/*"

                                onChange={handleImage}

                            />

                            {

                                imagePreview &&

                                <img

                                    src={imagePreview}

                                    alt="preview"

                                    className="mt-6 rounded-2xl h-72 w-full object-contain border"

                                />

                            }

                        </div>

                        <div>

                            <h2 className="font-semibold mb-4">

                                Dog Audio

                            </h2>

                            <input

                                type="file"

                                accept=".wav,audio/*"

                                onChange={handleAudio}

                            />

                            {

                                audioPreview &&

                                <audio

                                    controls

                                    src={audioPreview}

                                    className="mt-6 w-full"

                                />

                            }

                        </div>

                    </div>

                    <div className="text-center mt-10">

                        <button

                            onClick={handleAnalyze}

                            disabled={loading}

                            className="px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold shadow-xl hover:scale-105 transition-all"

                        >

                            {

                                loading ?

                                    "Analyzing..." :

                                    "Analyze Behaviour"

                            }

                        </button>

                    </div>

                    {

                        result &&

                        <div className="mt-12 grid md:grid-cols-3 gap-6">

                            <div className="bg-blue-50 rounded-2xl p-6 shadow">

                                <h2 className="text-xl font-bold text-blue-700">

                                    Image AI

                                </h2>

                                <p className="mt-4">

                                    Behaviour:

                                    <strong>

                                        {" "}

                                        {result.image_prediction.behaviour}

                                    </strong>

                                </p>

                                <p>

                                    Confidence:

                                    <strong>

                                        {" "}

                                        {result.image_prediction.confidence}%

                                    </strong>

                                </p>

                            </div>

                            <div className="bg-green-50 rounded-2xl p-6 shadow">

                                <h2 className="text-xl font-bold text-green-700">

                                    Audio AI

                                </h2>

                                <p className="mt-4">

                                    Behaviour:

                                    <strong>

                                        {" "}

                                        {result.audio_prediction.behaviour}

                                    </strong>

                                </p>

                                <p>

                                    Confidence:

                                    <strong>

                                        {" "}

                                        {result.audio_prediction.confidence}%

                                    </strong>

                                </p>

                            </div>

                            <div className="bg-purple-50 rounded-2xl p-6 shadow">

                                <h2 className="text-xl font-bold text-purple-700">

                                    Final Decision

                                </h2>

                                <p className="mt-4">

                                    Behaviour:

                                    <strong>

                                        {" "}

                                        {result.final_behaviour}

                                    </strong>

                                </p>

                                <p>

                                    Confidence:

                                    <strong>

                                        {" "}

                                        {result.confidence}%

                                    </strong>

                                </p>

                            </div>

                        </div>

                    }

                </div>

            </div>

        </>

    );

}

export default MultimodalAnalysis;