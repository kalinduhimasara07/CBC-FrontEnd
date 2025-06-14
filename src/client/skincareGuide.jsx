import React, { useState } from "react";
import {
  ArrowLeft,
  Sun,
  Moon,
  Droplets,
  Zap,
  Sparkles,
  Heart,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function SkincareGuide() {
  const [activeSkinType, setActiveSkinType] = useState("normal");
  const [activeRoutine, setActiveRoutine] = useState("morning");
  const [expandedTip, setExpandedTip] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);

  const skinTypes = {
    normal: {
      title: "Normal Skin",
      description: "Balanced, neither too oily nor too dry",
      characteristics: [
        "Smooth texture",
        "Small pores",
        "Good circulation",
        "Healthy complexion",
      ],
      icon: Heart,
      color: "bg-green-100 text-green-700",
    },
    dry: {
      title: "Dry Skin",
      description: "Lacks moisture and natural oils",
      characteristics: [
        "Tight feeling",
        "Flaky patches",
        "Fine lines",
        "Dull appearance",
      ],
      icon: Droplets,
      color: "bg-blue-100 text-blue-700",
    },
    oily: {
      title: "Oily Skin",
      description: "Produces excess sebum",
      characteristics: [
        "Shiny appearance",
        "Large pores",
        "Prone to breakouts",
        "Thick skin texture",
      ],
      icon: Zap,
      color: "bg-yellow-100 text-yellow-700",
    },
    combination: {
      title: "Combination Skin",
      description: "Mix of oily and dry areas",
      characteristics: [
        "Oily T-zone",
        "Dry cheeks",
        "Varying pore sizes",
        "Different needs by area",
      ],
      icon: Sparkles,
      color: "bg-purple-100 text-purple-700",
    },
  };

  const routines = {
    morning: {
      title: "Morning Routine",
      icon: Sun,
      steps: [
        {
          step: 1,
          name: "Gentle Cleanser",
          description: "Remove overnight impurities",
          time: "30 seconds",
        },
        {
          step: 2,
          name: "Toner/Essence",
          description: "Balance and prep skin",
          time: "1 minute",
        },
        {
          step: 3,
          name: "Serum",
          description: "Target specific concerns",
          time: "2 minutes",
        },
        {
          step: 4,
          name: "Moisturizer",
          description: "Hydrate and protect",
          time: "1 minute",
        },
        {
          step: 5,
          name: "Sunscreen",
          description: "SPF 30+ protection",
          time: "1 minute",
        },
      ],
    },
    evening: {
      title: "Evening Routine",
      icon: Moon,
      steps: [
        {
          step: 1,
          name: "Makeup Remover",
          description: "Remove makeup and sunscreen",
          time: "1 minute",
        },
        {
          step: 2,
          name: "Deep Cleanser",
          description: "Thorough cleansing",
          time: "1 minute",
        },
        {
          step: 3,
          name: "Treatment",
          description: "Active ingredients (retinol, AHA/BHA)",
          time: "2 minutes",
        },
        {
          step: 4,
          name: "Serum",
          description: "Nourishing serums",
          time: "2 minutes",
        },
        {
          step: 5,
          name: "Night Moisturizer",
          description: "Rich, repairing formula",
          time: "1 minute",
        },
      ],
    },
  };

  const tips = [
    {
      title: "Patch Test New Products",
      preview: "Always test new products on a small area first",
      content:
        "Apply a small amount of the product to your inner wrist or behind your ear. Wait 24-48 hours to check for any adverse reactions before using on your face.",
    },
    {
      title: "Less is More",
      preview: "Start with smaller amounts and build up",
      content:
        "Use a pea-sized amount for most products. You can always add more, but using too much can cause irritation and waste product.",
    },
    {
      title: "Wait Between Steps",
      preview: "Allow each product to absorb properly",
      content:
        "Wait 1-2 minutes between applying different products. This ensures proper absorption and prevents pilling or reduced effectiveness.",
    },
    {
      title: "Sun Protection is Key",
      preview: "SPF is your best anti-aging investment",
      content:
        "Apply broad-spectrum SPF 30+ every day, even indoors. Reapply every 2 hours when outdoors. This prevents premature aging and protects against skin cancer.",
    },
  ];

  const toggleStep = (stepIndex) => {
    const stepId = `${activeRoutine}-${stepIndex}`;
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
  };

  const isStepCompleted = (stepIndex) => {
    return completedSteps.includes(`${activeRoutine}-${stepIndex}`);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen mt-[80px] bg-gradient-to-br from-orange-50 to-amber-50">
        {/* Header */}
        {/* <div className="bg-white shadow-sm border-b border-orange-100">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: "#e17100" }}>
                  Crystal Beauty Clear
                </h1>
                <p className="text-sm text-gray-600">Complete Skincare Guide</p>
              </div>
            </div>
          </div>
        </div> */}

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
              <Sparkles className="w-10 h-10" style={{ color: "#e17100" }} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Journey to Radiant Skin
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover your skin type, build the perfect routine, and learn
              expert tips for achieving your healthiest, most glowing
              complexion.
            </p>
          </div>

          {/* Skin Type Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Discover Your Skin Type
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Object.entries(skinTypes).map(([key, type]) => {
                const IconComponent = type.icon;
                return (
                  <div
                    key={key}
                    onClick={() => setActiveSkinType(key)}
                    className={`cursor-pointer p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                      activeSkinType === key
                        ? "border-orange-300 bg-orange-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-orange-200"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${type.color}`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {type.title}
                    </h4>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Active Skin Type Details */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                {skinTypes[activeSkinType].title} Characteristics
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {skinTypes[activeSkinType].characteristics.map(
                  (char, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{char}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Routine Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Build Your Routine
            </h3>

            {/* Routine Selector */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg p-1 shadow-sm border border-orange-100">
                {Object.entries(routines).map(([key, routine]) => {
                  const IconComponent = routine.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveRoutine(key)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                        activeRoutine === key
                          ? "text-white shadow-sm"
                          : "text-gray-600 hover:bg-orange-50"
                      }`}
                      style={
                        activeRoutine === key
                          ? { backgroundColor: "#e17100" }
                          : {}
                      }
                    >
                      <IconComponent className="w-5 h-5" />
                      {routine.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Routine Steps */}
            <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100">
                <h4 className="text-xl font-semibold text-gray-900">
                  {routines[activeRoutine].title} Steps
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Tap each step to mark as completed
                </p>
              </div>

              <div className="p-8">
                <div className="space-y-4">
                  {routines[activeRoutine].steps.map((step, index) => (
                    <div
                      key={index}
                      onClick={() => toggleStep(index)}
                      className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isStepCompleted(index)
                          ? "border-green-300 bg-green-50"
                          : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          isStepCompleted(index)
                            ? "bg-green-500 text-white"
                            : "text-white"
                        }`}
                        style={
                          !isStepCompleted(index)
                            ? { backgroundColor: "#e17100" }
                            : {}
                        }
                      >
                        {isStepCompleted(index) ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          step.step
                        )}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">
                          {step.name}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {step.description}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">{step.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Expert Tips
            </h3>

            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedTip(expandedTip === index ? null : index)
                    }
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-orange-50 transition-colors"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {tip.title}
                      </h4>
                      <p className="text-sm text-gray-600">{tip.preview}</p>
                    </div>
                    {expandedTip === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {expandedTip === index && (
                    <div className="px-8 pb-6 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed">
                        {tip.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to Start Your Skincare Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore our curated collection of skincare products, each
              formulated with premium ingredients to help you achieve your best
              skin yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#e17100" }}
              >
                Shop Skincare
              </button>
              <button
                className="px-8 py-3 border-2 font-medium rounded-lg hover:bg-orange-50 transition-colors"
                style={{ borderColor: "#e17100", color: "#e17100" }}
              >
                Take Skin Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
