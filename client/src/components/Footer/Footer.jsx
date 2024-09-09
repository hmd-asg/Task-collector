import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className='flex-row text-center w-100 text-light bg-primary py-4'>
      <p> &copy; Copyright CodeSmith 2024</p>
    </footer>
  );
};

export default Footer;
