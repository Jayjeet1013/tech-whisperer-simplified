
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const levels = [
  {
    id: "im-5",
    label: "I'm 5",
    description: "Basic explanations with simple words"
  },
  {
    id: "high-school",
    label: "I'm in high school",
    description: "Teen-friendly explanations with some technical terms"
  },
  {
    id: "manager",
    label: "I'm a manager, not an engineer",
    description: "Business-focused explanations without code details"
  },
  {
    id: "smart-newbie",
    label: "I'm pretty smart, but new to this",
    description: "Detailed explanations with proper context"
  }
]

interface LevelSelectorProps {
  selectedLevel: string;
  onLevelChange: (value: string) => void;
}

export function LevelSelector({ selectedLevel, onLevelChange }: LevelSelectorProps) {
  return (
    <RadioGroup
      value={selectedLevel}
      onValueChange={onLevelChange}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
    >
      {levels.map((level) => (
        <div key={level.id}>
          <RadioGroupItem
            value={level.id}
            id={level.id}
            className="peer sr-only"
          />
          <Label
            htmlFor={level.id}
            className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
          >
            <div className="mb-1 font-semibold">{level.label}</div>
            <span className="text-sm text-muted-foreground text-center">
              {level.description}
            </span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}
