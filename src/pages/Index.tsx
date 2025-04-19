
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { LevelSelector } from "@/components/LevelSelector"
import { ExplanationCard } from "@/components/ExplanationCard"

function getPromptForLevel(level: string, text: string) {
  const prompts = {
    "im-5": `Explain the following text like I'm a 5-year-old. Use simple words, analogies, and examples. Avoid jargon. Text: ${text}`,
    "high-school": `Explain the following text to a high school student. Use age-appropriate examples and some basic technical terms. Text: ${text}`,
    "manager": `Explain the following text to a non-technical manager. Be concise, use real-world analogies, and skip code-heavy details. Text: ${text}`,
    "smart-newbie": `Explain the following text to someone who's intelligent but new to this topic. Provide proper context while maintaining technical accuracy. Text: ${text}`
  }
  return prompts[level as keyof typeof prompts] || prompts["im-5"]
}

export default function Index() {
  const [selectedLevel, setSelectedLevel] = useState("im-5")
  const [inputText, setInputText] = useState("")
  const [explanation, setExplanation] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleExplain = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      // For now, just mock the response
      const mockResponse = "This is a simplified explanation of " + inputText
      setExplanation(mockResponse)
      
      // Save to localStorage
      const history = JSON.parse(localStorage.getItem("explanationHistory") || "[]")
      history.unshift({
        text: inputText,
        explanation: mockResponse,
        level: selectedLevel,
        timestamp: new Date().toISOString()
      })
      localStorage.setItem("explanationHistory", JSON.stringify(history.slice(0, 10)))
    } catch (error) {
      console.error("Failed to get explanation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4">
            Explain Like I'm 5
          </h1>
          <p className="text-xl text-gray-600">
            Paste any technical text, and we'll explain it based on your knowledge level
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-center">Choose your level:</h2>
            <LevelSelector
              selectedLevel={selectedLevel}
              onLevelChange={setSelectedLevel}
            />
          </div>

          <div className="space-y-4">
            <Textarea
              placeholder="Paste the technical text you want to understand..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[150px] text-lg p-4"
            />
            <Button
              onClick={handleExplain}
              disabled={!inputText.trim() || isLoading}
              className="w-full text-lg py-6"
            >
              {isLoading ? "Analyzing..." : "Explain This!"}
            </Button>
          </div>

          {explanation && <ExplanationCard explanation={explanation} />}
        </div>
      </div>
    </div>
  )
}
