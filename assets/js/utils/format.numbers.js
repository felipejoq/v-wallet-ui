export const formatNumberToClp = ({ value }) => {
  const clp = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });

  return clp.format(value);
}