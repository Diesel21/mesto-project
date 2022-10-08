const handleError = (error) => console.log(error);
const handleJson = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export { handleError, handleJson };
