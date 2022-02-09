const coinAPI = async () => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(`Erro na API ${e}`);
  }
};

export default coinAPI;
