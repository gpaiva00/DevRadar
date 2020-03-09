<template>
  <form @submit="handleSubmit">
    <div class="input-block">
      <label for="github_username">Usuário do Github</label>
      <input name="github_username" id="github_username" required v-model="githubUsername" />
    </div>

    <div class="input-block">
      <label for="techs">Tecnologias</label>
      <input name="techs" id="techs" required v-model="techs" />
    </div>

    <div class="input-group">
      <div class="input-block">
        <label for="latitude">Latitude</label>
        <input
          type="number"
          name="latitude"
          id="latitude"
          v-model="latitude" />
      </div>

      <div class="input-block">
        <label for="longitude">Longitude</label>
        <input
          type="number"
          name="longitude"
          id="longitude"
          v-model="longitude"
        />
      </div>
    </div>

    <button type="submit">Salvar</button>
  </form>
</template>

<script>
import './styles.css';

export default {
  mounted() {
    this.load();
  },
  data: () => ({
    githubUsername: "",
    techs: "",
    longitude: 0,
    latitude: 0
  }),

  methods: {
    load() {
      // get user geolocation
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords

          this.latitude = latitude
          this.longitude = longitude
        },
        error => {
          console.log("Could not get geolocation", error)
        }
      )
    },
    async handleSubmit(e) {
      e.preventDefault();
      const { techs, latitude, longitude, githubUsername: github_username  } = this;

      this.$emit('onSubmit', {
        github_username,
        techs,
        latitude,
        longitude
      })

      this.github_username = '';
      this.techs = '';
    }
  }
}
</script>
