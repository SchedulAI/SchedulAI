import { Icon } from '../Icon';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { NavbarStyled } from './NavbarStyled';
import { getCookie } from '../../Utils/Cookies';

export const Navbar = () => {
  const navigate = useNavigate();
  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const isLogged = getCookie('logged_in');

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
        {isLogged ? (
          <Button
            onClick={() => {
              navigate('/dashboard');
            }}
          >
            <p>Dashboard</p>
          </Button>
        ) : (
          <>
            <a
              onClick={() => {
                navigate('/login');
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
          </>
        )}
      </div>
    </NavbarStyled>
  );
};
