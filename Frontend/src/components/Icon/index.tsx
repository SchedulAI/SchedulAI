import {
  Robot,
  Envelope,
  Eye,
  EyeClosed,
  ArrowSquareLeft,
  IconProps,
  IconWeight,
  CaretDown,
  ArrowCircleUp,
  User,
  CaretLineRight,
  CaretLineLeft,
  SidebarSimple,
  Plus,
} from '@phosphor-icons/react';
import React from 'react';

export interface IconTypes {
  robot: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  mail: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  view: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  hide: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  back: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  arrowDown: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  circleArrowUp: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  user: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  expandRight: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  expandLeft: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  sidebarSimple: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  plus: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
}

const IconList: IconTypes = {
  robot: Robot,
  mail: Envelope,
  view: Eye,
  hide: EyeClosed,
  back: ArrowSquareLeft,
  arrowDown: CaretDown,
  circleArrowUp: ArrowCircleUp,
  user: User,
  expandRight: CaretLineRight,
  expandLeft: CaretLineLeft,
  sidebarSimple: SidebarSimple,
  plus: Plus,
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
