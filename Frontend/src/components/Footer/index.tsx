import { Icon } from '../Icon';
import { FooterStyled } from './FooterStyled';
import { useTheme } from 'styled-components';

export const Footer = () => {
  const theme = useTheme();

  return (
    <FooterStyled>
      <div className="logo">
        <Icon icon="robot" weight="fill" size={32} color="#0a0a15" />
        <p>SchedulAI</p>
      </div>
      <p>© 2024 SchedulAI. Todos os direitos reservados.</p>
      <div className="social">
        <Icon
          icon="instagramLogo"
          weight="regular"
          size={32}
          color={theme.colors.textPrimary}
        />
        <Icon
          icon="xLogo"
          weight="regular"
          size={32}
          color={theme.colors.textPrimary}
        />
        <Icon
          icon="facebookLogo"
          weight="regular"
          size={32}
          color={theme.colors.textPrimary}
        />
        <Icon
          icon="at"
          weight="regular"
          size={32}
          color={theme.colors.textPrimary}
        />
      </div>
    </FooterStyled>
  );
};
