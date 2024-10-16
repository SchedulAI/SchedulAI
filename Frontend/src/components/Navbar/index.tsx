import { Icon } from '../Icon';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { useCheckAuth } from '../../Utils/ValidateAuth';
import { NavbarStyled } from './NavbarStyled';

export const Navbar = () => {
  const navigate = useNavigate();
  const checkAuth = useCheckAuth();
  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <NavbarStyled>
      <div
        className="logo"
        onClick={() => {
          navigate('/');
          handleScrollToSection('main-section');
        }}
      >
        <Icon icon="robot" weight="fill" size={32} color="#0A0A15" />
        <p>SchedulAI</p>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <a
              onClick={() => {
                navigate('/');
                handleScrollToSection('main-section');
              }}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                handleScrollToSection('news-section');
              }}
            >
              Novidades
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                handleScrollToSection('about-section');
              }}
            >
              Sobre
            </a>
          </li>
        </ul>
      </nav>
      <div className="buttons">
        <a
          onClick={() => {
            checkAuth.checkAuth();
          }}
        >
          Entrar
        </a>
        <Button
          onClick={() => {
            navigate('/register');
          }}
        >
          <p>Registrar</p>
        </Button>
      </div>
    </NavbarStyled>
  );
};
