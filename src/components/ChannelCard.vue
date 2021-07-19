<template>
  <div class="column is-one-third">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-96x96">
              <img
                :src="channelInfo.snippet.thumbnails.default.url"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ channelInfo.snippet.title }}</p>
            <p class="subtitle is-6">
              {{ channelInfo.snippet.localized.title }}
            </p>
          </div>
        </div>
        <div class="content description">
          {{ channelInfo.snippet.description }}
        </div>
        <div class="content">
          <div class="buttons">
              <a :href="`https://www.youtube.com/channel/${channelInfo.id}`" class="button is-primary" target="_blank">canal</a>
            <a
              v-for="playlist in playlists"
              :key="playlist.name"
              :href="playlist.link"
              class="button is-link"
              target="_blank"
              >{{ playlist.name }}</a
            >
            <b-button tag="router-link"
                :to="'canal/'+channelInfo.id"
                type="is-info">
                Videos
            </b-button>
          </div>
          <time :datetime="channelInfo.snippet.publishedAt">
            {{ channelInfo.snippet.publishedAt | toDateLocale }}
          </time>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    channelInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    playlists() {
      const { relatedPlaylists } = this.channelInfo.contentDetails;
      return Object.keys(relatedPlaylists).reduce((acc, val) => {
        if (relatedPlaylists[val].length > 3) {
          acc.push({
            name: val,
            link: `https://www.youtube.com/playlist?list=${relatedPlaylists[val]}`,
          });
        }
        return acc;
      }, []);
    },
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
