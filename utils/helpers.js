module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${date.toLocaleString('default', { month: 'long' })} ${new Date(date).getDate()}`;
  },

  input_format_date: (date) => {
    return `${date.toISOString().split('T')[0]}`;
  },

  read_legth: (max) => {
    return `${Math.floor(Math.random() * max)} `;
  },
  excerpt: (text) => {
    let newText = text.substring(0, 100);
    newText = text.length > 100 ? newText + '...' : newText; 
    return newText;
  },
  create_slug: (str) => {
    return str
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  },
  selected: (val1, val2) => {
    const value = (val1 == val2 ? 'selected' : '');
    return (value)
  },
  checked: (val1, val2) => {

    for (let i = 0; i < val2.length; i++) {
      if (val2[i].id == val1) {
        return 'checked';
      }
    }
    return '';
  }
};
