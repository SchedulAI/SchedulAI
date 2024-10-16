interface CardProps {
  status: 'planning' | 'pending' | 'reviewing' | 'scheduled' | 'cancelled';
  proposed_date: proposed_date | string;
  title?: string;
  Display: 'Flex' | 'none';
  onClick?: () => void;
}
