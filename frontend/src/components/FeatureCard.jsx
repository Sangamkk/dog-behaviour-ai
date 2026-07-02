import {
    FaCamera,
    FaMicrophone,
    FaBrain,
    FaBolt
} from "react-icons/fa";

function FeatureCard({ title, description }) {

    const getIcon = () => {

        if (title.includes("Image"))
            return <FaCamera />;

        if (title.includes("Audio"))
            return <FaMicrophone />;

        if (title.includes("Multimodal"))
            return <FaBrain />;

        return <FaBolt />;

    };

    return (

        <div className="group bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 overflow-hidden">

            {/* Top Gradient */}

            <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500"></div>

            <div className="p-8">

                {/* Icon */}

                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-3xl group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-700 group-hover:text-white transition-all duration-300">

                    {getIcon()}

                </div>

                {/* Title */}

                <h2 className="text-2xl font-bold text-slate-800 mt-6">

                    {title}

                </h2>

                {/* Description */}

                <p className="text-gray-600 leading-7 mt-4">

                    {description}

                </p>

                {/* Bottom */}

                <div className="mt-8 flex justify-between items-center">

                    <span className="text-blue-600 font-semibold text-sm">

                        AI Module

                    </span>

                    <span className="text-xl text-blue-600 group-hover:translate-x-1 transition-all">

                        →

                    </span>

                </div>

            </div>

        </div>

    );

}

export default FeatureCard;