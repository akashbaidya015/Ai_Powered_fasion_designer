'use client'

import React, { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'

export default function Component() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [gender, setGender] = useState("Male") // Default to Male
  const [mood, setMood] = useState("")

  const handleGenerateDesign = async () => {
    setIsGenerating(true)
    setGeneratedImages([]) // Reset the images

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          prompt: mood,
          gender: gender,
        }),
      });

      if (response.ok) {
        const data = await response.json() // Parse JSON response
        if (data.images) {
          setGeneratedImages(data.images) // Set images from backend
        }
      } else {
        console.error("Error generating images:", response.statusText)
      }
    } catch (error) {
      console.error("Error during API call:", error)
    }

    setIsGenerating(false)
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('https://storage.cloud.google.com/fashion_ui_background/AdobeStock_569671913_Preview.jpeg.jpg?authuser=1')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
      <div className="relative">
        <nav className="flex items-center justify-between p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <Link href="#" className="flex items-center space-x-2">
            <div className="text-xl font-bold text-black">Team - Jab Data Met Model </div>
          </Link>
          <Button variant="outline" className="bg-black text-white hover:bg-gray-900 border-none">
            Log in
          </Button>
        </nav>

        <div className="relative h-[80vh] flex items-center justify-center">
          <div className="relative z-10 text-center space-y-8 w-full max-w-md px-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              Personal Fashion Designer
            </h1>
            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                <Button
                  className={`bg-white text-black transition-all duration-300 ${
                    gender === "Male"
                      ? "font-bold bg-gray-300 scale-105 shadow-lg"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setGender("Male")}
                >
                  Male
                </Button>
                <Button
                  className={`bg-white text-black transition-all duration-300 ${
                    gender === "Female"
                      ? "font-bold bg-gray-300 scale-105 shadow-lg"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setGender("Female")}
                >
                  Female
                </Button>
              </div>
              <Input 
                type="text" 
                placeholder="Explain the occasion you want to generate dress designs for" 
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="bg-white/80 text-black placeholder-gray-500 text-sm py-6"
              />
              <Button 
                className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 w-full"
                onClick={handleGenerateDesign}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating designs...
                  </>
                ) : (
                  'Generate Stylish Designs'
                )}
              </Button>
            </div>
          </div>
        </div>

        {!isGenerating && generatedImages.length > 0 && (
          <div className="bg-white/95 backdrop-blur-sm py-20">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Your Generated Designs</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {generatedImages.map((src, index) => (
                  <div key={index} className="aspect-square relative group overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={src}  // Use backend-provided URL directly
                      alt={`Generated design ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
