import {
  Robot,
  Envelope,
  Eye,
  EyeClosed,
  ArrowSquareLeft,
  IconWeight,
  CaretDown,
  ArrowCircleUp,
  User,
  CaretLineRight,
  CaretLineLeft,
  SidebarSimple,
  Plus,
  XSquare,
  X,
  InstagramLogo,
  XLogo,
  FacebookLogo,
  At,
  CaretUp,
  Trash,
  SignOut
} from '@phosphor-icons/react';

const IconList: IconTypes = {
  robot: Robot,
  mail: Envelope,
  view: Eye,
  hide: EyeClosed,
  back: ArrowSquareLeft,
  arrowUp: CaretUp,
  arrowDown: CaretDown,
  circleArrowUp: ArrowCircleUp,
  user: User,
  expandRight: CaretLineRight,
  expandLeft: CaretLineLeft,
  sidebarSimple: SidebarSimple,
  plus: Plus,
  close: XSquare,
  x: X,
  xLogo: XLogo,
  instagramLogo: InstagramLogo,
  facebookLogo: FacebookLogo,
  at: At,
  exclude: Trash,
  signOut: SignOut,
};

interface PropTypes {
  icon: keyof IconTypes;
  size?: string | number;
  weight?: IconWeight;
  color?: string;
}

export const Icon = ({ icon, size, weight, color }: PropTypes) => {
  const IconElement = IconList[icon];
  return <IconElement size={size} weight={weight} color={color} />;
};
