import { BsFiletypePdf, BsFiletypeTxt } from 'react-icons/bs';
import './Header.css';

function Header() {
  return (
    <header>
      <BsFiletypePdf className="icon-left" />
      <p className="title">PDF to DOC</p>
      <BsFiletypeTxt className="icon-right" />
    </header>
  );
}

export default Header;
