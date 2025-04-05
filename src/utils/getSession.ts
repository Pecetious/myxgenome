export default (): any | null => {
  try {
    const sessionData = localStorage.getItem("session");
    if (sessionData) {
      const parsedSession = JSON.parse(sessionData);
      return parsedSession || null;
    }
    return null;
  } catch (error) {
    console.error("JSON parse error: ", error);
    return null;
  }
};
