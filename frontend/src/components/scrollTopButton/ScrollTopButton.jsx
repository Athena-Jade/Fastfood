import "./ScrollTopButton.css";
import { FaArrowAltCircleUp } from "react-icons/fa";

function ScrollTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <span className="scroll-to-top" onClick={scrollToTop}>
        <FaArrowAltCircleUp size={20} />
      </span>
    </>
  );
}

export default ScrollTopButton;
