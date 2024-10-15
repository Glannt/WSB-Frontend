export const phoneCodes = [
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+91', country: 'India' },
  { code: '+81', country: 'Japan' },
  { code: '+61', country: 'Australia' },
  { code: '+55', country: 'Brazil' },
];

export type Wallet = {
  walletId: string; // Unique identifier for the wallet
  amount: number; // Amount of money in the wallet
};

export type Transaction = {
  transactionId: string; // Unique identifier for the transaction
  date: string; // Date of the transaction (ISO 8601 format)
  amount: number; // Amount of money in the transaction
  status: string; // Status of the transaction (e.g., "completed")
  type: string; // Description of the transaction
};

export type Customer = {
  userId: string; // Unique identifier for the user
  fullName: string; // Full name of the customer
  email: string; // Email address of the customer
  phoneNumber: string; // Phone number of the customer
  dateOfBirth: string; // Date of birth of the customer (ISO 8601 format)
  membership: string | null; // Membership info (can be null)
  roleName: string; // Role assigned to the customer (e.g., "CUSTOMER")
  wallet: Wallet; // Wallet information of the customer
};
