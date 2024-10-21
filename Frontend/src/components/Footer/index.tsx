import { Icon } from '../Icon';
import { FooterStyled } from './FooterStyled';

export const Footer = () => {
  return (
    <FooterStyled>
      <div className="logo">
        <Icon icon="robot" weight="fill" size={32} color="#0a0a15" />
        <p>SchedulAI</p>
      </div>
      <p>© 2024 SchedulAI. Todos os direitos reservados.</p>
      <div className="social">
        <Icon icon="instagramLogo" weight="regular" size={32} color="#0a0a15" />
        <Icon icon="xLogo" weight="regular" size={32} color="#0a0a15" />
        <Icon icon="facebookLogo" weight="regular" size={32} color="#0a0a15" />
        <Icon icon="at" weight="regular" size={32} color="#0a0a15" />
      </div>
    </FooterStyled>
  );
};
