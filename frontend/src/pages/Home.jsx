import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import StatCard from "../components/StatCard";
import WorkflowCard from "../components/WorkflowCard";
import TechnologyCard from "../components/TechnologyCard";

import {
  FaImages,
  FaBrain,
  FaChartLine,
  FaDatabase,
  FaUpload,
  FaSearch
} from "react-icons/fa";

import {
  FaReact,
  FaPython
} from "react-icons/fa";

import {
  SiFastapi,
  SiPytorch,
  SiOpencv,
  SiTailwindcss
} from "react-icons/si";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}

      <section className="min-h-[110vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center px-8 py-20">

          <div>

            <span className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold shadow-sm mb-6">
              AI Powered Behaviour Detection
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">

              <span className="text-slate-900">
                Multimodal
              </span>

              <br />

              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
                Dog Behaviour Analysis
              </span>

            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-8 max-w-xl">
              Analyze dog behaviour using facial expressions and vocal
              signals powered by Deep Learning and Artificial Intelligence.
            </p>

            <Link to="/multimodal">

              <button className="mt-10 px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">

                Start Analysis →

              </button>

            </Link>

          </div>

          <div className="flex justify-center">

            <div className="relative">

              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur-2xl opacity-20"></div>

              <img
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=700"
                alt="Dog"
                className="relative h-[600px] w-auto rounded-3xl shadow-2xl border-4 border-white object-cover hover:scale-105 transition-all duration-500"
              />

            </div>

          </div>

        </div>

      </section>
      <section className="bg-white min-h-[50vh] py-32">

        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-5xl font-bold text-center text-slate-800">
            Project Statistics
          </h2>

          <p className="text-center text-gray-600 mt-4">
            Dataset and model overview.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            <div className="max-w-7xl mx-auto px-8">

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

                  <StatCard
                    icon={<FaImages />}
                    value="9,325+"
                    label="Dog Images"
                  />

                  <StatCard
                    icon={<FaBrain />}
                    value="5"
                    label="Behaviour Classes"
                  />

                  <StatCard
                    icon={<FaChartLine />}
                    value="95%"
                    label="Model Accuracy"
                  />

                  <StatCard
                    icon={<FaDatabase />}
                    value="AI"
                    label="Deep Learning"
                  />

                </div>

              </div>

          </div>

        </div>

      </section>


      {/* Features */}

      <section className="bg-white py-24">

        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-5xl font-bold text-center text-slate-800">

            Project Features

          </h2>

          <p className="text-center text-gray-600 mt-5 max-w-3xl mx-auto text-lg">

            Our AI system combines facial expression recognition and vocal
            signal analysis to understand dog behaviour accurately.

          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">

            <FeatureCard
              title="🖼 Image Analysis"
              description="Analyze dog facial expressions using deep learning."
            />

            <FeatureCard
              title="🎤 Audio Analysis"
              description="Detect behaviour from barks, growls and vocal sounds."
            />

            <FeatureCard
              title="🤖 Multimodal AI"
              description="Combine image and audio for higher prediction accuracy."
            />

            <FeatureCard
              title="⚡ Real-Time Results"
              description="Predict behaviour instantly with confidence scores."
            />

          </div>

        </div>

      </section>

      {/* Workflow */}

      <section className="py-24 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white">

        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-5xl font-bold text-center">

            How It Works

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            <WorkflowCard
              number="1"
              icon={<FaUpload />}
              title="Upload"
              description="Upload the dog's facial image or vocal recording."
            />

            <WorkflowCard
              number="2"
              icon={<FaSearch />}
              title="Feature Extraction"
              description="Extract facial and vocal features using AI."
            />

            <WorkflowCard
              number="3"
              icon={<FaBrain />}
              title="Deep Learning"
              description="EfficientNet and CNN models analyze the extracted features."
            />

            <WorkflowCard
              number="4"
              icon={<FaChartLine />}
              title="Prediction"
              description="Predict the dog's behaviour with confidence."
            />

          </div>

        </div>

      </section>

      {/* Technology */}

      <section className="bg-slate-50 py-24">

        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-5xl font-bold text-center text-slate-800">

            Technologies Used

          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-16">

            <TechnologyCard
              icon={<FaReact />}
              name="React"
              color="bg-cyan-500"
            />

            <TechnologyCard
              icon={<SiTailwindcss />}
              name="Tailwind"
              color="bg-sky-500"
            />

            <TechnologyCard
              icon={<SiFastapi />}
              name="FastAPI"
              color="bg-green-500"
            />

            <TechnologyCard
              icon={<SiPytorch />}
              name="PyTorch"
              color="bg-orange-500"
            />

            <TechnologyCard
              icon={<SiOpencv />}
              name="OpenCV"
              color="bg-indigo-500"
            />

            <TechnologyCard
              icon={<FaPython />}
              name="Python"
              color="bg-yellow-500"
            />

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Home;