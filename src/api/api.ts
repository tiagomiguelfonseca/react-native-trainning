import axios from 'axios';
// URL da dummy data
const DATA_URL =
  'https://gist.githubusercontent.com/joe-oli/90c01558ce1efe8a4961ca7cf3b5d09c/raw/73856bbdabbddc5cc172f83f27bf65063c951411/photos-data.json';
// Função para buscar os dados
export const fetchData = async () => {
  try {
    const response = await axios.get(DATA_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
