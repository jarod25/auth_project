<template>
  <div>
    <h1 class="text-center">Liste des courses de Formule 1</h1>
    <div class="row">
      <div class="col1-" v-for="(season, index) in seasons" :key="index">
        <h2 class="text-center">{{ season.season }}</h2>
        <div class="card-group">
          <div
            v-for="(race, index) in season.races"
            :key="index"
          >
              <v-card class="m-3 p-3">
            <img
              :src="race.circuitImage"
              class="card-img-top"
              alt="Image du circuit"
            />
            <div class="card-body">
              <h5 class="card-title">{{ race.name }}</h5>
              <p class="card-text mb-1">
                {{ race.circuitName }}, {{ race.country }}
              </p>
              <p class="card-text mb-0">
                <small class="text-muted">{{
                  new Date(race.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                }}</small>
              </p>
            </div>
              </v-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seasons: [],
    };
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:3000/races");
      const data = await response.json();
        this.seasons = data.reduce((acc, race) => {
          const seasonIndex = acc.findIndex(
              (season) => season.season === race.season
          );
          if (seasonIndex === -1) {
              acc.push({
                  season: race.season,
                  races: [race],
              });
          } else {
              acc[seasonIndex].races.push(race);
          }
          return acc;
      }, []);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
