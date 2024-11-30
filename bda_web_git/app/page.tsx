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

  const handleGenerateDesign = () => {
    setIsGenerating(true);
    setGeneratedImages([]); // Reset the images
    // Simulate API call with setTimeout
    setTimeout(() => {
      setGeneratedImages([
        '/placeholder.svg',
        '/placeholder.svg',
        '/placeholder.svg',
        '/placeholder.svg',
        '/placeholder.svg',
        '/placeholder.svg',
        '/placeholder.svg',
        '/placeholder.svg',
        '/placeholder.svg',
        '/placeholder.svg'
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trendy-bohemian-abstract-element-liquid-shape-art-templates-with-floral-elements-for-social-media-posts-mobile-apps-banners-design-and-web-internet-ads-fashion-backgrounds-boho-style-background-vector.jpg-WZWf6t5lC85bI4ZDwFnKjeIcFD4xp6.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
      <div className="relative">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <Link href="#" className="flex items-center space-x-2">
            <div className="text-xl font-bold text-black">The Black</div>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#" className="text-sm text-gray-800 hover:text-black">
              AI Design
            </Link>
            <Link href="#" className="text-sm text-gray-800 hover:text-black">
              AI Branding
            </Link>
            <Link href="#" className="text-sm text-gray-800 hover:text-black">
              AI Video
            </Link>
            <Link href="#" className="text-sm text-gray-800 hover:text-black">
              AI Assistant
            </Link>
            <Link href="#" className="text-sm text-gray-800 hover:text-black">
              Features
            </Link>
            <Link href="#" className="text-sm text-gray-800 hover:text-black">
              Gallery
            </Link>
            <Link href="#" className="text-sm text-gray-800 hover:text-black">
              Designers
            </Link>
            <Link href="#" className="text-sm text-gray-800 hover:text-black">
              Pricing
            </Link>
            <Link href="#" className="text-sm text-gray-800 hover:text-black">
              Blog
            </Link>
          </div>
          <Button variant="outline" className="bg-black text-white hover:bg-gray-900 border-none">
            Log in
          </Button>
        </nav>

        {/* Hero Section */}
        <div className="relative h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20" />
          <Image
            src="/placeholder.svg"
            alt="Fashion Design"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="relative z-10 text-center space-y-8 w-full max-w-md px-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              AI Fashion Design
            </h1>
            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                <Button className="bg-white text-black hover:bg-gray-200 text-lg px-6 py-4 flex-1">
                  Male
                </Button>
                <Button className="bg-white text-black hover:bg-gray-200 text-lg px-6 py-4 flex-1">
                  Female
                </Button>
              </div>
              <Input 
                type="text" 
                placeholder="Explain your occasion for which you want to generate dress designs" 
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

        {/* Generated Designs Section */}
        {isGenerating && (
          <div className="bg-white/95 backdrop-blur-sm py-20 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-lg font-semibold">Generating your designs...</p>
          </div>
        )}
        {!isGenerating && generatedImages.length > 0 && (
          <div className="bg-white/95 backdrop-blur-sm py-20">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Your Generated Designs</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {generatedImages.map((src, index) => (
                  <div key={index} className="aspect-square relative group overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={src}
                      alt={`Generated design ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button variant="outline" className="text-white border-white hover:bg-white/20">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="bg-white/90 backdrop-blur-sm py-20">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Bring your fashion ideas to life.
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-12">
              The New Black helps designers and brands create unique and original fashion designs using artificial intelligence (AI). 
              Unleash your creativity and bring your ideas to life in seconds, simply by describing what&apos;s on your mind.
            </p>
            <Button className="bg-black text-white hover:bg-gray-900 text-lg px-8 py-6">
              Discover AI creation types
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

