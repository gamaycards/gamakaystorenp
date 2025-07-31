// Mock API functions that simulate real API calls

export interface GiftCard {
  id: string
  platform: string
  amount: number
  code: string
  purchaseDate: string
}

export interface PurchaseRequest {
  platform: string
  amount: number
  email: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock API: Purchase gift card
export async function purchaseGiftCard(request: PurchaseRequest): Promise<ApiResponse<GiftCard>> {
  await delay(3000 + Math.random() * 2000) // 3-5 second delay

  // Simulate occasional failures (10% chance)
  if (Math.random() < 0.1) {
    return {
      success: false,
      error: "Payment processing failed. Please try again.",
    }
  }

  const giftCard: GiftCard = {
    id: `GC-${Date.now()}`,
    platform: request.platform,
    amount: request.amount,
    code: `${request.platform.toUpperCase()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    purchaseDate: new Date().toISOString(),
  }

  return {
    success: true,
    data: giftCard,
  }
}

// Mock API: Fetch available platforms
export async function fetchPlatforms(): Promise<ApiResponse<any[]>> {
  await delay(1500 + Math.random() * 1000) // 1.5-2.5 second delay

  const platforms = [
    { name: "Steam", icon: "/images/STEAM.svg", discount: 5, available: true },
    { name: "PlayStation", icon: "/images/PLAYSTATION.svg", discount: 10, available: true },
    { name: "Xbox", icon: "/images/XBOX.svg", discount: 8, available: true },
    { name: "Nintendo", icon: "/images/NINTENDO.svg", discount: 12, available: true },
    { name: "Epic Games", icon: "/images/EPICGAMES.svg", discount: 15, available: true },
    { name: "Apple", icon: "/images/APPLE.svg", discount: 7, available: true },
  ]

  return {
    success: true,
    data: platforms,
  }
}

// Mock API: Validate email
export async function validateEmail(email: string): Promise<ApiResponse<boolean>> {
  await delay(800 + Math.random() * 400) // 0.8-1.2 second delay

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  return {
    success: true,
    data: isValid,
  }
}

// Mock API: Check platform availability
export async function checkPlatformAvailability(platform: string): Promise<ApiResponse<boolean>> {
  await delay(500 + Math.random() * 500) // 0.5-1 second delay

  // Simulate occasional unavailability
  const isAvailable = Math.random() > 0.05 // 95% availability

  return {
    success: true,
    data: isAvailable,
  }
}
