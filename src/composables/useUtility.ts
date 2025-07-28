
function formatDate(isoDateStr: string): string {
  const date = new Date(isoDateStr);

  if (isNaN(date.getTime())) {
    // Invalid date fallback
    return '';
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  return date.toLocaleDateString('en-US', options);
}

function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  const month: string = date.toLocaleString('en-US', { month: 'short' }); // "Feb"
  const day: number = date.getDate(); // 12
  const year: number = date.getFullYear(); // 2025

  const time: string = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).toLowerCase(); // "5:52 pm"

  return `${month} ${day}, ${year} at ${time}`;
}


function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() > payload.exp * 1000;
  } catch (e) {
    return true; // If anything fails, treat it as expired
  }
}


function getUserRole(token: string) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload && payload.role) {
      return payload.role;
    }

  } catch (e) {
    return null;
  }
}

export function useUtility() {
  return { formatDate, formatDateTime, isTokenExpired, getUserRole }
}