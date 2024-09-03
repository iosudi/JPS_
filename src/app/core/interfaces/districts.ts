export interface Apartment {
  imageSrc: string;
  hostName: string;
  description: string;
  location: string;
  bathrooms: number;
  bedrooms: number;
  doors: number;
  duration: string;
  rating: number;
  reviewsCount: number;
  pricePerDay: string;
}

export interface District {
  name: string;
  description: string;
  imgSrc: string;
  apartments: Apartment[];
}
