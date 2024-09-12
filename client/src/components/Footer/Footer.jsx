import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer>
      <div>
        {/* Footer content here */}
      </div>
    </footer>
  );
};

export default Footer;
