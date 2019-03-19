export interface Deed {
  id?: number;
  title: string;
  city: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  organization: string;
  maxPeople: number;
  currentPeople: number;
  description: string;
  tags: string;
  date: string;
  isExpanded: boolean;
}
