"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, ExternalLink } from "lucide-react";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in ${product.name}. Can you help me with the details?`;
    const whatsappUrl = `https://wa.me/${product.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${product.contact.phone}`, '_blank');
  };

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <img
            src={product.images[currentImageIndex] || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.jpg";
            }}
          />
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-2 flex gap-1">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <CardTitle className="text-xl font-bold mb-2">{product.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-4">
          {product.description}
        </CardDescription>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-primary">
            ₹{product.price}
          </div>
          <Badge variant="secondary" className="text-xs">
            {product.currency}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              {feature}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleWhatsApp}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
          <Button 
            onClick={handleCall}
            variant="outline"
            className="flex-1"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
        </div>

        <div className="mt-3 text-xs text-muted-foreground text-center">
          Contact: {product.contact.phone}
        </div>
      </CardContent>
    </Card>
  );
} 