// @flow
const tf = (i: number): string => `${i < 10 ? '0' : ''}${i}`;

const formatDate = (time, format: string): string => {
  const t = new Date(time);

  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (a: string) => {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
      case 'MM':
        return tf(t.getMonth() + 1);
      case 'mm':
        return tf(t.getMinutes());
      case 'dd':
        return tf(t.getDate());
      case 'HH':
        return tf(t.getHours());
      case 'ss':
        return tf(t.getSeconds());
      default:
        return ''; // TODO
    }
  });
};

export default formatDate;
