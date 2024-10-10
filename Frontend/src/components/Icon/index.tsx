import {
  Robot,
  Envelope,
  Eye,
  EyeClosed,
  ArrowSquareLeft,
  IconProps,
  IconWeight,
} from "@phosphor-icons/react";

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
}

const IconList: IconTypes = {
    robot: Robot,
    mail: Envelope,
    view: Eye,
    hide: EyeClosed,
    back: ArrowSquareLeft,
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
}

