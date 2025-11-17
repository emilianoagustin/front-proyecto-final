"use client";

import { useState } from "react";
import { KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface CategoryInputProps {
  value?: string[];
  onChange: (categories: string[]) => void;
  error?: string;
}

export function CategoryInput({
  value = [],
  onChange,
  error,
}: CategoryInputProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newCategory = inputValue.trim();

      if (newCategory && !value.includes(newCategory) && value.length < 3) {
        onChange([...value, newCategory]);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeCategory = (indexToRemove: number) => {
    onChange(
      value.filter((_: string, index: number) => index !== indexToRemove)
    );
  };

  return (
    <div className="space-y-2">
      <Label>Categories</Label>
      <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-10">
        {value.map((category, index) => (
          <Badge key={index} variant="secondary" className="gap-1">
            {category}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeCategory(index)}
            />
          </Badge>
        ))}
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length < 3 ? "Add category..." : "Max reached"}
          disabled={value.length >= 3}
          className="flex-1 border-0 focus-visible:ring-0 min-w-[120px]"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <p className="text-sm text-muted-foreground">
        Press Enter or comma to add. {value.length}/3 categories
      </p>
    </div>
  );
}
