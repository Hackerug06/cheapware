"use client"

import { useState } from "react"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    rating: 5,
    date: "2023-10-15",
    title: "Excellent refrigerator with smart features",
    content:
      "This refrigerator exceeded my expectations. The smart features are intuitive and actually useful. I love being able to check what's inside when I'm at the grocery store. The temperature control is precise and the ice maker works perfectly.",
    helpful: 24,
    unhelpful: 2,
  },
  {
    id: 2,
    user: "Michael Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40&text=MR",
    rating: 4,
    date: "2023-09-28",
    title: "Great product with minor issues",
    content:
      "Overall, I'm very satisfied with this refrigerator. The capacity is excellent and it runs quietly. The only issue I've had is that the app sometimes disconnects from the fridge, requiring me to reset the connection. Otherwise, it's a great purchase.",
    helpful: 15,
    unhelpful: 3,
  },
  {
    id: 3,
    user: "Jennifer Lee",
    avatar: "/placeholder.svg?height=40&width=40&text=JL",
    rating: 5,
    date: "2023-11-02",
    title: "Worth every penny",
    content:
      "After researching refrigerators for months, I finally decided on this model and I couldn't be happier. The design is sleek, the features are amazing, and it keeps everything at the perfect temperature. The internal cameras are a game-changer!",
    helpful: 32,
    unhelpful: 1,
  },
]

export default function ProductReviews({ productId }: { productId: number }) {
  const [reviews] = useState(mockReviews)
  const [newReview, setNewReview] = useState({ rating: 5, title: "", content: "" })
  const [helpfulClicks, setHelpfulClicks] = useState<Record<number, "helpful" | "unhelpful" | null>>({})

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  const handleRatingChange = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }))
  }

  const handleHelpfulClick = (reviewId: number, type: "helpful" | "unhelpful") => {
    setHelpfulClicks((prev) => {
      // If already clicked the same button, unclick it
      if (prev[reviewId] === type) {
        const newState = { ...prev }
        delete newState[reviewId]
        return newState
      }
      // Otherwise set the new state
      return { ...prev, [reviewId]: type }
    })
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="flex items-center mr-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-6 w-6 ${star <= averageRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
        <span className="text-xl font-medium">{averageRating.toFixed(1)} out of 5</span>
        <span className="text-gray-500 ml-2">({reviews.length} reviews)</span>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4">Write a Review</h3>
        <div className="mb-4">
          <p className="mb-2">Rating:</p>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => handleRatingChange(star)} className="focus:outline-none">
                <Star
                  className={`h-6 w-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Review Title"
            className="w-full p-2 border rounded-md"
            value={newReview.title}
            onChange={(e) => setNewReview((prev) => ({ ...prev, title: e.target.value }))}
          />
        </div>
        <div className="mb-4">
          <Textarea
            placeholder="Write your review here..."
            className="min-h-[100px]"
            value={newReview.content}
            onChange={(e) => setNewReview((prev) => ({ ...prev, content: e.target.value }))}
          />
        </div>
        <Button>Submit Review</Button>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center mb-2">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={review.avatar} alt={review.user} />
                <AvatarFallback>
                  {review.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{review.user}</p>
                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>

            <h4 className="font-medium mb-2">{review.title}</h4>
            <p className="text-gray-700 mb-4">{review.content}</p>

            <div className="flex items-center text-sm">
              <span className="mr-4">Was this review helpful?</span>
              <button
                onClick={() => handleHelpfulClick(review.id, "helpful")}
                className={`flex items-center mr-3 ${helpfulClicks[review.id] === "helpful" ? "text-green-600" : "text-gray-500"}`}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{review.helpful + (helpfulClicks[review.id] === "helpful" ? 1 : 0)}</span>
              </button>
              <button
                onClick={() => handleHelpfulClick(review.id, "unhelpful")}
                className={`flex items-center ${helpfulClicks[review.id] === "unhelpful" ? "text-red-600" : "text-gray-500"}`}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                <span>{review.unhelpful + (helpfulClicks[review.id] === "unhelpful" ? 1 : 0)}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

  
