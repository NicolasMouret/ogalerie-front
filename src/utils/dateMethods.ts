/* eslint-disable import/prefer-default-export */

export const setDateComment = (date: string) => {
  if (Number.isNaN(Date.parse(date))) throw new Error('Invalid date');
  const isoDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = isoDate.toLocaleDateString('fr-FR', options);
  return formattedDate;
};
