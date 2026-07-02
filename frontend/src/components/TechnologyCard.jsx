function TechnologyCard({ icon, name, color }) {

    return (

        <div className="group bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8">

            {/* Icon */}

            <div
                className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center text-4xl text-white mx-auto shadow-lg group-hover:scale-110 transition-all duration-300`}
            >

                {icon}

            </div>

            {/* Technology Name */}

            <h2 className="text-xl font-bold text-slate-800 text-center mt-6">

                {name}

            </h2>

            {/* Bottom Text */}

            <p className="text-gray-500 text-center text-sm mt-3">

                Technology Used

            </p>

        </div>

    );

}

export default TechnologyCard;