interface CardProps {
  status:
    | 'planning'
    | 'pending'
    | 'reviewing'
    | 'scheduled'
    | 'cancelled'
    | 'deleted';
  proposed_date: proposed_date | string;
  title?: string;
  Display?: 'Flex' | 'none';
  visibility?: boolean;
  onClick?: () => void;
}
