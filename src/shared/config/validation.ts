export const isTextFieldValid = (val: string) => {
  if (val.trim().length < 3) {
    return false;
  }
  return true;
}

export const isNumericFieldValid = (val: number, max: number) => {
  if (val < 1 || val > max || val % 1 !== 0) {
    return false;
  }
  return true;
}


export const isEmailValid = (val: string) => {
  const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regEx.test(val);
}