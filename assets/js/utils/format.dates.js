export function formatDate({date}) {
    const dateTime = new Date(date);
    
    const dateFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    const timeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  
    const formattedDate = dateTime.toLocaleDateString('es-ES', dateFormatOptions);
    const formattedTime = dateTime.toLocaleTimeString('es-ES', timeFormatOptions);
  
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
  
    return formattedDateTime;
}