export interface User {
  _id: string;
  name?: string;
  email?: string;
  emailVerified?: string;
  image?: string;
  createAt: string;
  updateAt: string;
  favoriteIds?: string[];
}

export interface Listing {
  _id: string;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  location: string;
  userId: string;
  price: number;
  user?: User;
  reservations?: Reservation[];
  currency: string;
}

export interface Reservation {
  _id: string;
  userId: string;
  listingId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user?: User;
  listing?: Listing;
}

export interface IListingParams {
  userId?: string;
  category?: string;
  location?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
}
