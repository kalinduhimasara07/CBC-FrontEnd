import { useLocation } from "react-router-dom";
import FloatingNotice from "../components/floatingNotice";


export default function Sample() {
    const location = useLocation();
    const cart = location.state?.cart || [];
  return (
    <div>
      <FloatingNotice cart={cart} />
    </div>
  );
}
