function isValidBase64(str) {
  try {
    return atob(str);
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default isValidBase64;
