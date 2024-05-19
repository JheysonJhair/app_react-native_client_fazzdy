export const getNotificacionesProximos = async () => {
    try {
      const response = await fetch(
        'https://satlled.ccontrolz.com/satelite/conflagration',
      );
      const data = await response.json();
      return data.value;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  
  export const getNotificacionesAnteriores = async () => {
    try {
      const response = await fetch(
        'https://satlled.ccontrolz.com/satelite/recentFires',
      );
      const data = await response.json();
      return data.value;
    } catch (error) {
      return [];
    }
  };