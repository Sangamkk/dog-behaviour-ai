import { Link } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import {
    FaReact,
    FaPython,
    FaGithub
} from "react-icons/fa";
import { SiFastapi, SiPytorch } from "react-icons/si";

function Footer() {

    return (

        <footer className="bg-slate-950 text-white border-t border-slate-800 mt-24">

            <div className="max-w-7xl mx-auto px-8 py-14">

                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Left */}

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">

                                <FaDog className="text-white text-xl" />

                            </div>

                            <div>

                                <h2 className="text-2xl font-bold">

                                    Dog Behaviour AI

                                </h2>

                                <p className="text-sm text-gray-400">

                                    Multimodal Deep Learning

                                </p>

                            </div>

                        </div>

                        <p className="text-gray-400 mt-6 leading-7">

                            An AI-powered system that combines facial
                            expressions and vocal signals to analyze
                            dog behaviour using multimodal deep learning.

                        </p>

                    </div>

                    {/* Links */}

                    <div>

                        <h3 className="text-lg font-semibold mb-6">

                            Navigation

                        </h3>

                        <div className="space-y-3">

                            <Link
                                to="/"
                                className="block text-gray-400 hover:text-blue-400 transition"
                            >
                                Home
                            </Link>

                            <Link
                                to="/image"
                                className="block text-gray-400 hover:text-blue-400 transition"
                            >
                                Image Analysis
                            </Link>

                            <Link
                                to="/audio"
                                className="block text-gray-400 hover:text-blue-400 transition"
                            >
                                Audio Analysis
                            </Link>

                            <Link
                                to="/multimodal"
                                className="block text-gray-400 hover:text-blue-400 transition"
                            >
                                Multimodal Analysis
                            </Link>

                        </div>

                    </div>

                    {/* Tech */}

                    <div>

                        <h3 className="text-lg font-semibold mb-6">

                            Built With

                        </h3>

                        <div className="flex flex-wrap gap-5 text-3xl">

                            <FaReact className="text-cyan-400 hover:scale-110 transition" />

                            <SiFastapi className="text-green-400 hover:scale-110 transition" />

                            <FaPython className="text-yellow-400 hover:scale-110 transition" />

                            <SiPytorch className="text-orange-500 hover:scale-110 transition" />

                            <FaGithub className="text-gray-300 hover:scale-110 transition" />

                        </div>

                        <p className="text-gray-500 text-sm mt-6">

                            React • Tailwind CSS • FastAPI • PyTorch

                        </p>

                    </div>

                </div>

                <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">

                    <p className="text-gray-500 text-sm">

                        © 2026 Dog Behaviour AI. Final Year Deep Learning Project.

                    </p>

                    <p className="text-gray-500 text-sm mt-4 md:mt-0">

                        Built with ❤️ for intelligent animal behaviour analysis.

                    </p>

                </div>

            </div>

        </footer>

    );

}

export default Footer;