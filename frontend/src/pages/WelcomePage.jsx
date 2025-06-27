import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title.jsx";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  // Efecto para el contador automático
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/home");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Función para proceder manualmente
  const handleProceed = () => {
    navigate("/home");
  };

  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <Card className="welcome-card">
          <div className="welcome-content">
            <Title
              text="¡Bienvenido a Event Planner!"
              level="h1"
              className="welcome-title"
            />

            <Title
              text="Impulso Creativo"
              level="h2"
              className="organization-title"
            />

            <p className="welcome-description">
              Gestiona todos tus eventos culturales, educativos y sociales de
              manera organizada y eficiente.
            </p>

            <div className="welcome-actions">
              <Button
                text="Comenzar Ahora"
                onClick={handleProceed}
                variant="primary"
                className="proceed-button"
              />

              <p className="auto-redirect">
                Redirección automática en {countdown} segundos...
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WelcomePage;
