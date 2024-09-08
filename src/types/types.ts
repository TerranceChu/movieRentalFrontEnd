export interface Movie {
    _id: string;
    title: string;
    year: number;
    genre: string;
    rating: number;
    status: string;
  }

export interface Application {
  _id: string;
  applicantName: string;
  applicantEmail: string;
  description: string;
  status: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
}
  
  
  