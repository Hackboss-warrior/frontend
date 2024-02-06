import React, { useEffect, useState } from 'react';

const TokenRegister = ({ onTokenChange }) => {
  useEffect(() => {
    const handleTokenChange = (e) => {
      const newToken = e.newValue;
      onTokenChange(newToken);
    };

    console.log("ok")

    // Suscribirse al evento de cambio en el localStorage
    window.addEventListener('storage', handleTokenChange);

    // Limpiar la suscripción cuando el componente se desmonta
    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, [onTokenChange]);

  // Este componente no renderiza nada, solo gestiona el evento de cambio en el token
  return null;
};

export default TokenRegister;
