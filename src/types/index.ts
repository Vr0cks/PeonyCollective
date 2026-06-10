export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: 'buyer' | 'seller' | 'admin';
  phone_number: string | null;
  iban: string | null;
  address: string | null;
  rating: number | null;
  sales_count: number;
  avatar_url: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  seller_id: string;
  gender: string;
  category: string;
  subcategory: string;
  size: string | null;
  brand: string;
  model_name: string;
  description: string;
  price: number;
  condition: string;
  material: string | null;
  dimensions: string | null;
  purchase_year: number | null;
  serial_number: string | null;
  public_images: string[];
  authenticity_docs: string[];
  flaw_images?: string[];
  video_url?: string | null;
  odor_score?: number | null;
  has_spa_treatment?: boolean | null;
  full_set_items?: string[] | null;
  status: 'pending' | 'approved' | 'rejected' | 'sold';
  locked_until?: string | null;
  created_at: string;
  profiles?: Partial<Profile>;
}

export interface Order {
  id: string;
  buyer_id: string;
  product_id: string;
  seller_id: string;
  total_price: number;
  order_status: 'pending_payment' | 'paid' | 'shipped_to_lab' | 'inspecting' | 'lab_approved' | 'shipped_to_buyer' | 'delivered' | 'completed' | 'cancelled' | 'refunded';
  shipping_tracking_seller: string | null;
  shipping_tracking_buyer: string | null;
  payment_id: string | null;
  created_at: string;
  products?: Product;
  buyer?: Partial<Profile>;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
  sender?: Partial<Profile>;
}

export interface Conversation {
  id: string;
  participant_1: string;
  participant_2: string;
  product_id: string | null;
  last_message: string | null;
  last_message_at: string | null;
  created_at: string;
  product?: Partial<Product>;
  participant_1_profile?: Partial<Profile>;
  participant_2_profile?: Partial<Profile>;
  other_profile?: Partial<Profile>;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'product_approved' | 'product_rejected' | 'order_created' | 'message_received' | 'shipping_update';
  title: string;
  message: string;
  is_read: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
}
