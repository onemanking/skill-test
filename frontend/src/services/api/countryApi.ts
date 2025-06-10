export async function fetchCountries(search: string) {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const apiURL = `${baseUrl}/countries`;
  const url = search
    ? `${apiURL}?search=${encodeURIComponent(search)}`
    : apiURL;
  const res = await fetch(url);
  if (!res.ok) throw new Error('API error');
  return res.json();
}
