interface CardProps {
  status: 'pending' | 'cancelled' | 'confirmed';
  eventDate?: string;
  eventTime?: string;
  proposedDateRange?: string;
  subject?: string;
  Display: 'Flex' | 'none';
  onClick?: () => void;
}
