// Type for the "trips" table
export interface Trip {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    notes: string;
  }
  
  // Type for the "destinations" table
  export interface Destination {
    id: number;
    trip_id: number;
    name: string;
    start_date: string;
    end_date: string;
    latitude: number;
    longitude: number;
  }
  
  // Type for the "expenses" table
  export interface Expense {
    id: number;
    destination_id: number;
    amount: number;
    description: string;
    date: string;
  }
  
  // Type for the "activity_categories" table
  export interface ActivityCategory {
    id: number;
    name: string;
  }
  
  // Type for the "activities" table
  export interface Activity {
    id: number;
    destination_id: number;
    name: string;
    description: string;
    date: string;
    category_id: number;
  }