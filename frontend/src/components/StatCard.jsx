function StatCard({ icon, value, label }) {

    return (

        <div className="group bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 text-center">

            {/* Icon */}

            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-3xl group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-700 group-hover:text-white transition-all duration-300">

                {icon}

            </div>

            {/* Value */}

            <h2 className="text-4xl font-extrabold text-slate-800 mt-6">

                {value}

            </h2>

            {/* Label */}

            <p className="text-gray-500 text-lg mt-3">

                {label}

            </p>

        </div>

    );

}

export default StatCard;