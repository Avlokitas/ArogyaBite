import { Upload, Scan, PieChart, ThumbsUp } from "lucide-react"

const steps = [
  {
    title: "Upload Label",
    description: "Take a photo of any food label or ingredient list and upload it to our platform.",
    icon: Upload,
  },
  {
    title: "AI Scan",
    description: "Our advanced AI technology scans and analyzes the ingredients for potential allergens.",
    icon: Scan,
  },
  {
    title: "Risk Score",
    description: "Receive a personalized risk assessment score based on your specific dietary needs.",
    icon: PieChart,
  },
  {
    title: "Get Recommendations",
    description: "View safer alternative food options that match your preferences and restrictions.",
    icon: ThumbsUp,
  },
]

export default function HowItWorks() {
  return (
    <section
      className="py-20 bg-fixed bg-cover bg-center relative"
      style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/hero-bg.jpg')" }}
      id="how-it-works"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Four simple steps to safer eating with ArogyaBite</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border border-gray-700 hover:bg-opacity-20 transition-all duration-300"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                  <step.icon size={32} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white text-center">{step.title}</h3>
              <p className="text-gray-300 text-center">{step.description}</p>
              <div className="flex justify-center mt-4">
                <div className="text-emerald-500 font-bold text-lg">Step {index + 1}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
