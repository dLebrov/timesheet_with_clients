export const formatNumberWithPoints = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
