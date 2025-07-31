export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  contact: {
    phone: string;
    whatsapp: string;
    viber: string;
  };
  features: string[];
}

export const products: Product[] = [
  {
    id: "steam-wallet",
    name: "Steam Gift Cards",
    description: "Choose Your Amount! Available in $5, $10, and custom amounts.",
    price: 850,
    currency: "INR",
    images: [
      "/products/steam-hero.png",
      "/products/steam-viber.png",
      "/products/steam-whatsapp.png"
    ],
    contact: {
      phone: "9862157864",
      whatsapp: "9862157864",
      viber: "9862157864"
    },
    features: [
      "Quick Delivery",
      "Best Rates",
      "Multiple Amounts Available",
      "Instant Activation"
    ]
  },
  {
    id: "playstation-giftcards",
    name: "PlayStation Gift Cards",
    description: "PlayStation Gift Cards INR - Choose Your Amount!",
    price: 850,
    currency: "INR",
    images: [
      "/products/playstation-hero.png",
      "/products/playstation-viber.png",
      "/products/playstation-whatsapp.png"
    ],
    contact: {
      phone: "9862157864",
      whatsapp: "9862157864",
      viber: "9862157864"
    },
    features: [
      "Quick Delivery",
      "Best Rates",
      "PSN Store Credit",
      "Secure Transactions"
    ]
  },
  {
    id: "itunes-giftcard",
    name: "iTunes Gift Cards (Apple App Store)",
    description: "Game codes in 10 mins! Easy redemption with hassle-free guides.",
    price: 850,
    currency: "INR",
    images: [
      "/products/itunes-hero.png",
      "/products/itunes-viber.png",
      "/products/itunes-whatsapp.png"
    ],
    contact: {
      phone: "9862157864",
      whatsapp: "9862157864",
      viber: "9862157864"
    },
    features: [
      "10-Minute Delivery",
      "Easy Redemption",
      "Competitive Prices",
      "Guaranteed Refunds"
    ]
  }
]; 