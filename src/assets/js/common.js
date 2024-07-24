function getDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0'); // Corregido para obtener el día correcto
    const hour = `${now.getHours()}`.padStart(2, '0');
    const minute = `${now.getMinutes()}`.padStart(2, '0');
    const second = `${now.getSeconds()}`.padStart(2, '0');
    return `${year}/${month}/${day} ${hour}:${minute}:${second}`; // Añadido hora y minutos
   };
