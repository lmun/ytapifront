<template>
  <div class="column is-one-quarter">
    <div class="card">
      <div class="card-image">
    <figure class="image is-4by3">
        <a :href="`https://www.youtube.com/watch?v=${videoInfo.id}`" target="_blank">
      <img :src="videoInfo.snippet.thumbnails.high.url" alt="Placeholder image">
    </a>
    </figure>
  </div>
      <div class="card-content">
          <div class="content">
            <p class="title is-6">{{ videoInfo.snippet.title }}</p>
        </div>
        <div class="content">
          <time :datetime="videoInfo.snippet.publishedAt">
            {{ videoInfo.snippet.publishedAt | toDateLocale }}
          </time>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    videoInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
  },
  filters: {
    toDateLocale(da) {
      return new Date(da).toLocaleDateString('es-cl');
    },
  },
};
</script>
<style scoped lang="scss">
div.content.description {
  white-space: pre-wrap;
  overflow-y: auto;
  height: 5rem;
}
</style>
