export interface Pizza {
  Crust: string;
  Flavor: string;
  Size: string;
  Table_No: number;
}

export interface Order {
  Order_ID: number;
  Crust: string;
  Flavor: string;
  Size: string;
  Table_No: number;
  timestamp: string;
}
