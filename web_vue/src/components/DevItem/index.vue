<template>
  <li class="dev-item" :key="dev._id">
    <header>
      <img :src="dev.avatar_url" :alt="dev.name" />
      <div class="user-info">
        <!-- <font-awesome-icon :icon="['fas', 'trash']" /> -->
        <strong>{{ dev.name }}</strong>
        <span>{{ dev.techs.join(",") }}</span>

        <p>{{ dev.bio }}</p>
        <a :href="`http://github.com/${dev.github_username}`" target="_blank">
          Acessar perfil no Github
        </a>
      </div>
    </header>
  </li>
</template>

<script>
import "./styles.css"

export default {
  props: {
    dev: Object
  }
}
</script>
