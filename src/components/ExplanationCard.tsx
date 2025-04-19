
import { useState } from "react"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

interface ExplanationCardProps {
  explanation: string;
}

export function ExplanationCard({ explanation }: ExplanationCardProps) {
  const { toast } = useToast()
  const [isAnimating, setIsAnimating] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(explanation)
      setIsAnimating(true)
      toast({
        description: "Copied to clipboard!",
      })
      setTimeout(() => setIsAnimating(false), 500)
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to copy text.",
      })
    }
  }

  return (
    <Card className="w-full mt-8 bg-white shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className={`transition-transform ${isAnimating ? "scale-110" : ""}`}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-lg leading-relaxed">
            {explanation}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
