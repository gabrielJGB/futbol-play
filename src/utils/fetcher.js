export const fetcher = (url) => fetch(url,{cache:"no-cache"}).then(res => {
  if (!res.ok) throw new Error('Error al cargar');
  return res.json();
});
