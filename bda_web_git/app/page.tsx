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
  const [linkToBuy, setLinkToBuy] = useState(false) // Checkbox state
  const [isModalOpen, setIsModalOpen] = useState(false) // Modal state
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    age: '',
    address: '',
    phone: '',
    email: '',
    favoriteColors: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submit-user-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('User data submitted successfully!');
        setIsModalOpen(false);
        setUserData({
          name: '',
          surname: '',
          age: '',
          address: '',
          phone: '',
          email: '',
          favoriteColors: '',
        });
      } else {
        console.error('Failed to submit user data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
          linkToBuy: linkToBuy ? "true" : "false", // Include checkbox value
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
          <Button
            variant="outline"
            className="bg-black text-white hover:bg-gray-900 border-none"
            onClick={() => setIsModalOpen(true)}
          >
            Log in
          </Button>
        </nav>

        <div className="relative h-[80vh] flex items-center justify-center">
          <div className="relative z-10 text-center space-y-8 w-full max-w-md px-4">
            <h2 className="text-6xl md:text-8xl font-montserrat font-bold tracking-tight text-white drop-shadow-lg -ml-8">
              Personal Fashion Designer
            </h2>
            <div className="space-y-4">
              <div className="flex justify-center gap-4 items-center">
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
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={linkToBuy}
                    onChange={(e) => setLinkToBuy(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-white">Link to buy</span>
                </label>
              </div>
              <Input 
                type="text" 
                placeholder="Explain the occasion for which you want to generate dress designs" 
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

        {/* Generated Images Section */}
        {generatedImages.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {generatedImages.map((imageUrl, index) => (
              <div key={index} className="w-64 h-80 border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white">
                <Image
                  src={imageUrl}
                  alt={`Generated Design ${index + 1}`}
                  layout="intrinsic"
                  width={384} // Specify desired width
                  height={512} // Specify desired height
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
              <div className="space-y-3">
                <Input name="name" placeholder="Name" value={userData.name} onChange={handleInputChange} />
                <Input name="surname" placeholder="Surname" value={userData.surname} onChange={handleInputChange} />
                <Input name="age" placeholder="Age" value={userData.age} onChange={handleInputChange} />
                <Input name="address" placeholder="Address" value={userData.address} onChange={handleInputChange} />
                <Input name="phone" placeholder="Phone" value={userData.phone} onChange={handleInputChange} />
                <Input name="email" placeholder="Email" value={userData.email} onChange={handleInputChange} />
                <Input name="favoriteColors" placeholder="Favorite Colors" value={userData.favoriteColors} onChange={handleInputChange} />
              </div>
              <div className="mt-4 flex justify-between">
                <Button className="bg-gray-300" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-500 text-white" onClick={handleFormSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
