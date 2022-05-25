import { NavLink } from 'react-router-dom';

const Header = () => {
  const pages = [
    {
      name: 'Inicio',
      linkTo: '/',
    },
    {
      name: 'Clientes',
      linkTo: '/listar-clientes',
    },
    // {
    //   name: 'Proyección y análisis',
    //   linkTo: '/proyeccion-analisis',
    // },
  ];

  return (
    <header id="header">
      <div className="container">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <ul id="" className="navbar-menu">
            <li className="navbar-start">
              {pages.map((page, _) => (
                <NavLink
                  className="navbar-item"
                  to={page.linkTo}
                  key={page.name}
                >
                  {page.name}
                </NavLink>
              ))}
            </li>
          </ul>
        </nav>
      </div>

      <div className="container">
        <nav>
          <ul></ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
