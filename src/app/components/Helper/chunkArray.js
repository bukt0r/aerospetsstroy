const chunkArray = (array, chunkSize) => {
  if (chunkSize <= 0) {
    throw new Error("chunkSize должно быть больше 0");
  }

  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

export default chunkArray;