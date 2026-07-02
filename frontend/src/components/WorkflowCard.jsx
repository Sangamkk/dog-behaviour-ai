function WorkflowCard({ number, icon, title, description }) {

    return (

        <div className="group relative bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">

            {/* Top Gradient */}

            <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500"></div>

            <div className="p-8 text-center">

                {/* Step Number */}

                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-lg">

                    {number}

                </div>

                {/* Icon */}

                <div className="w-20 h-20 rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center text-4xl mx-auto mt-6 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-700 group-hover:text-white transition-all duration-300">

                    {icon}

                </div>

                {/* Title */}

                <h2 className="text-2xl font-bold text-slate-800 mt-6">

                    {title}

                </h2>

                {/* Description */}

                <p className="text-gray-600 leading-7 mt-4">

                    {description}

                </p>

            </div>

        </div>

    );

}

export default WorkflowCard;