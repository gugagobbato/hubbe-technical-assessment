import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" className="header">
      <Container className="header-container">
        <div className="header-left">
          <a href="https://hubbe.app">
            <img
              alt="Hubbe Logo"
              className="header-logo"
              src="https://hubbe.app/wp-content/uploads/2023/09/logo-hubbe-digital-2.png"
            />
          </a>
        </div>
        {/* Adicione outros elementos do cabeçalho à direita, se necessário */}
      </Container>
    </Navbar>
  );
};

export default Header;
