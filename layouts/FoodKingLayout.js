import Footer from "./Footer";
import Header from "./Header";

const FoodKingLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default FoodKingLayout;
