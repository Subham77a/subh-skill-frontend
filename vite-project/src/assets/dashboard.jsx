import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRightCircle } from "lucide-react"; // nice icon for the link

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;

  // Redirect unauthorized user
  useEffect(() => {
    if (!username) {
      alert("Sign in first!");
      navigate("/signup");
    }
  }, [username, navigate]);

  // States for inputs
  const [actualPrice, setActualPrice] = useState("");
  const [predictedPrice, setPredictedPrice] = useState("");
  const [advice, setAdvice] = useState(null);
  const [brand, setBrand] = useState("");

  // Function to compute buy advice
  const handleEvaluate = () => {
    const actual = parseFloat(actualPrice);
    const predicted = parseFloat(predictedPrice);

    if (isNaN(actual) || isNaN(predicted)) {
      alert("Please enter valid numbers for both prices.");
      return;
    }

    const diffPercent = ((actual - predicted) / predicted) * 100;
    let score, message;

    if (diffPercent < -15) {
      score = 9;
      message = "🔥 Great deal! Definitely buy it.";
    } else if (diffPercent < 0) {
      score = 7;
      message = "✅ Good deal. Worth considering.";
    } else if (diffPercent < 10) {
      score = 5;
      message = "⚖️ Average deal. Neutral.";
    } else if (diffPercent < 20) {
      score = 3;
      message = "⚠️ Slightly overpriced. Maybe wait.";
    } else {
      score = 1;
      message = "❌ Overpriced. Don’t buy.";
    }

    setAdvice({ score, message });
  };

  // Brand website mapping
  const brandWebsites = {
    asus: "https://www.asus.com",
    acer: "https://www.acer.com",
    lenovo: "https://support.lenovo.com/in/en/lenovo-service-provider",
    dell: "https://www.dell.com",
    hp: "https://www.hp.com",
    razor: "https://www.razer.com",
    apple: "https://www.apple.com",
    windows: "https://www.microsoft.com",
    google: "https://store.google.com",
  };

  const handleBrandRedirect = () => {
    if (!brand) {
      alert("Please select a brand first.");
      return;
    }
    window.open(brandWebsites[brand], "_blank", "noopener,noreferrer");
  };

  if (!username) return <div>Redirecting to Sign-In...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6">
      <div className="backdrop-blur-xl bg-white/70 border border-gray-200 shadow-2xl rounded-3xl p-10 w-full max-w-lg transition transform hover:scale-[1.01] duration-200">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Welcome, {username} 👋
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Evaluate your laptop deal and check official brand sites.
        </p>

        {/* Inputs Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              💰 Actual Price (₹)
            </label>
            <input
              type="number"
              value={actualPrice}
              onChange={(e) => setActualPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Enter actual laptop price"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              🤖 Predicted Price (₹)
            </label>
            <input
              type="number"
              value={predictedPrice}
              onChange={(e) => setPredictedPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Enter predicted price from model"
            />
          </div>

          <button
            onClick={handleEvaluate}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg transition-all"
          >
            Evaluate Deal
          </button>

          {advice && (
            <div className="mt-6 text-center bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-inner">
              <p className="text-2xl font-bold text-blue-700">
                Score: {advice.score}/10
              </p>
              <p className="text-gray-700 mt-2 text-lg">{advice.message}</p>
            </div>
          )}

          {/* Prediction Site Link */}
          <a
            href="http://localhost:8501"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-blue-600 font-medium mt-6 hover:text-blue-800 transition"
          >
            Visit the prediction website <ArrowRightCircle size={20} />
          </a>

          {/* Brand Section */}
          <div className="mt-8 bg-gray-50 border border-gray-200 p-5 rounded-2xl shadow-inner">
            <label className="block text-gray-700 font-semibold mb-3 text-center">
              🏷️ Choose Laptop Brand
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition"
            >
              <option value="">-- Select a brand --</option>
              <option value="asus">ASUS</option>
              <option value="acer">Acer</option>
              <option value="lenovo">Lenovo</option>
              <option value="dell">Dell</option>
              <option value="hp">HP</option>
              <option value="razor">Razer</option>
              <option value="apple">Apple</option>
              <option value="windows">Windows</option>
              <option value="google">Google</option>
            </select>

            <button
              onClick={handleBrandRedirect}
              className="w-full bg-green-600 text-white py-3 mt-4 rounded-xl font-semibold hover:bg-green-700 hover:shadow-lg transition-all"
            >
              Go to Official Brand Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
