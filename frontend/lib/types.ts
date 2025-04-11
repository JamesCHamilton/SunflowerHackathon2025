export interface Platform {
    id: string;
    name: string;
    accounts: Account[];
}

export interface Account {
    id: string;
    name: string;
    avatar?: string;
    chats: Chat[];
}

export interface Chat {
    id: string;
    customer: Customer;
    messages: Message[];
}

export interface Customer {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    avatar?: string;
    notes?: string;
    online?: boolean;
}

export interface Message {
    sender: "user" | "customer";
    content: string;
    timestamp: number;
}
