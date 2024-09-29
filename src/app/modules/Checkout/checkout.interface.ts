export interface TCheckout {
    name: string;              // Name of the customer
    email: string;             // Email address of the customer
    phone: string;             // Phone number of the customer
    address: string;           // Delivery address for the order
    paymentMethod: 'cod' | 'stripe'; // Selected payment method
  }