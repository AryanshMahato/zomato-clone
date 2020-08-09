export interface Category {
  id: number;
  name: string;
}

export interface Cuisines {
  id: number;
  name: string;
}

export interface AllRestaurant {
  id: number;
  name: string;
  timings: string;
  rating: string;
  phoneNumber: string;
  location: string;
}

export interface Restaurant {
  id: number;
  name: string;
  timings: string;
  url: string;
  phoneNumber: string;
  location: {
    address: string;
  };
  rating: {
    aggregate_rating: string;
    rating_text: string;
    votes: number;
  };
}
