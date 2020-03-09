<template>
  <div id="app">
    <aside>
      <strong>Cadastrar</strong>

      <DevForm @onSubmit="handleAddDev"/>
    </aside>

    <main>
      <ul>
        <DevItem v-for="(dev) in devs" :key="dev._id" :dev="dev" />
      </ul>
    </main>
  </div>
</template>

<script>
import DevForm from './components/DevForm'
import DevItem from './components/DevItem'
import API from './services/API';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

export default {
  name: 'App',
  components: {
    DevForm,
    DevItem,
  },

  mounted() {
    this.load();
  },

  data: () => ({
    devs: []
  }),

  methods: {
    async load() {
      const response = await API.get('/devs');

      this.devs = response.data;
    },
    async handleAddDev(data) {
      const response = await API.post('/devs', data);

      this.devs = [...this.devs, response.data];
    },
  }
}
</script>