import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  {
    const navigate = useNavigate();

    useEffect(() => {
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);

      return () => clearTimeout(timer);
    }, [navigate]);

    return <h1>This page does not exist...</h1>;
  }
}
