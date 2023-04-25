const axios = require("axios");

const config2021 = {
  method: "get",
  url: "https://v1.formula-1.api-sports.io/races?season=2021",
  headers: {
    "x-rapidapi-key": "68e575495fda12d1a94497609f2b3740",
    "x-rapidapi-host": "v1.formula-1.api-sports.io",
  },
};

const config2022 = {
  method: "get",
  url: "https://v1.formula-1.api-sports.io/races?season=2022",
  headers: {
    "x-rapidapi-key": "68e575495fda12d1a94497609f2b3740",
    "x-rapidapi-host": "v1.formula-1.api-sports.io",
  },
};

async function getRaces() {
  const races = [];
  try {
    const response2021 = await axios(config2021);
    const races2021 = response2021.data.response;
    races.push(...races2021);

    const response2022 = await axios(config2022);
    const races2022 = response2022.data.response;
    races.push(...races2022);
    return races.map((race) => {
      return {
        season: race.season,
        circuitName: race.circuit.name,
        circuitImage: race.circuit.image,
        country: race.competition.location.country,
        date: race.date,
      };
    });

  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { getRaces };
