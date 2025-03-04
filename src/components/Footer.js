
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} - Todos los derechos reservados</p>
        <ul className="footer-links">
          <li><a href="/privacidad" className="text-white">Privacidad</a></li>
          <li><a href="/terminos" className="text-white">Términos de Servicio</a></li>
          <li><a href="/contacto" className="text-white">Contacto</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
