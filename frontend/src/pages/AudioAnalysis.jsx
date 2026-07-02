import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../app/api/api";

function AudioAnalysis() {

    const [audio, setAudio] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const handleAudio = (e) => {

        const file = e.target.files[0];

        if (file) {

            setSelectedFile(file);

            setAudio(URL.createObjectURL(file));

            setResult(null);

        }

    }

    const handleAnalyze = async () => {

        if (!selectedFile) {

            alert("Please Upload Audio");

            return;

        }

        setLoading(true);

        const formData = new FormData();

        formData.append("file", selectedFile);

        try {

            const response = await api.post(
                "/predict/audio",
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

    }

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-6">

                <div className="max-w-5xl mx-auto">

                    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-10">

                        <h1 className="text-4xl font-bold text-center text-slate-800">

                            Audio Behaviour Analysis

                        </h1>

                        <p className="text-center text-gray-500 mt-3">

                            Upload a dog vocal signal to predict its behaviour.

                        </p>

                        <div className="mt-10 border-2 border-dashed border-blue-300 rounded-2xl p-10">

                            <input

                                type="file"

                                accept=".wav,audio/*"

                                onChange={handleAudio}

                                className="w-full"

                            />

                            {

                                audio &&

                                <audio

                                    controls

                                    src={audio}

                                    className="mt-8 w-full"

                                />

                            }

                        </div>

                        <div className="text-center mt-10">

                            <button

                                onClick={handleAnalyze}

                                disabled={loading}

                                className="px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold shadow-xl hover:scale-105 transition-all duration-300"

                            >

                                {

                                    loading ?

                                        "Analyzing..." :

                                        "Analyze Audio"

                                }

                            </button>

                        </div>

                        {

                            result &&

                            <div className="mt-10 bg-green-50 border border-green-300 rounded-2xl p-8">

                                <h2 className="text-2xl font-bold text-green-700">

                                    Prediction Result

                                </h2>

                                <p className="mt-5 text-lg">

                                    <strong>Behaviour :</strong>

                                    {" "}

                                    {result.behaviour}

                                </p>

                                <p className="mt-3 text-lg">

                                    <strong>Confidence :</strong>

                                    {" "}

                                    {result.confidence}%

                                </p>

                            </div>

                        }

                    </div>

                </div>

            </div>

        </>

    );

}

export default AudioAnalysis;