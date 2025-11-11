export function getAgGridColumns(data, colNames = []) {
  return data.length
    ? Object.keys(data[0]).map((key) => ({
        field: key,
        filter: colNames.includes(key),
      }))
    : [];
}
