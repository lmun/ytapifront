/* eslint-disable max-len */
<template>
  <div class="home">
    <section class="section channel-list">
      <b-loading
        :is-full-page="true"
        v-model="isLoading"
        :can-cancel="true"
      ></b-loading>
      <b-tabs type="is-toggle" expanded>
        <b-tab-item label="Descargados" icon="video">
          <template #header>
            <b-icon icon="video"></b-icon>
            <span>
              Descargados <b-tag rounded> {{ videos.length }} </b-tag>
            </span>
          </template>
          <div class="container">
            <b-pagination
              :total="videos.length"
              v-model="current"
              :per-page="perPage"
            >
            </b-pagination>
            <div class="columns is-multiline">
              <VideoCard
                v-for="video in videosOrdenados"
                :key="video.id"
                :videoInfo="video"
              >
              </VideoCard>
            </div>
          </div>
        </b-tab-item>
        <b-tab-item label="Unlisted">
          <template #header>
            <b-icon icon="ban"></b-icon>
            <span>
              Unlisted <b-tag rounded> {{ borrados.length }} </b-tag>
            </span>
          </template>
          <div class="columns is-multiline">
            <VideoCard
              v-for="video in borrados"
              :key="video.id"
              :videoInfo="video"
            >
            </VideoCard>
          </div>
        </b-tab-item>
        <b-tab-item label="Videos" icon-pack="fab" icon="youtube">
          <template #header>
            <b-icon pack="fab" icon="youtube"></b-icon>
            <span>
              Youtube <b-tag rounded> {{ youtubePublic.length }} </b-tag>
            </span>
          </template>
          <div class="columns is-multiline">
            <VideoCard
              v-for="video in nuevos"
              :key="video.id"
              :videoInfo="video"
            >
            </VideoCard>
          </div>
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <b-icon icon="ghost"></b-icon>
            <span>
              Missing <b-tag rounded> {{ missing.length }} </b-tag>
            </span>
          </template>
          <div class="columns is-multiline">
            <VideoCard
              v-for="video in missing"
              :key="video.id"
              :videoInfo="video"
            >
            </VideoCard>
          </div>
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
/* eslint-disable max-len */
// @ is an alias to /src
import { get } from '@/api/api';
import VideoCard from '@/components/VideoCard.vue';

export default {
  name: 'Canal',
  data() {
    return {
      videos: [],
      youtubePublic: [],
      current: 1,
      perPage: 8,
      isLoading: true,
      missing: [],
    };
  },
  components: {
    VideoCard,
  },
  async mounted() {
    try {
      console.log(this.$route.params.id);
      const promesas = [
        get(`canales/${this.$route.params.id}/videos`),
        get(`canales/${this.$route.params.id}/youtube`),
        get(`canales/${this.$route.params.id}/missing`),
      ];
      const [videos, youtubePublic, missing] = await Promise.all(promesas);
      this.videos = videos
        .map((x) => ({ f: new Date(x.snippet.publishedAt).getTime(), x }))
        .sort((a, b) => b.f - a.f)
        .map((x) => x.x);
      this.youtubePublic = youtubePublic;
      this.missing = missing;
    } catch (error) {
      console.log(error.message);
    }
    await this.$nextTick();
    this.isLoading = false;
  },
  computed: {
    videosOrdenados() {
      return this.videos.slice(
        (this.current - 1) * this.perPage,
        this.current * this.perPage,
      );
    },
    borrados() {
      const publicos = new Set(
        this.youtubePublic.map((x) => x.snippet.resourceId.videoId),
      );
      return this.videos.filter((x) => !publicos.has(x.id));
    },
    nuevos() {
      const idsDescargados = new Set(this.videos.map((x) => x.id));
      return this.youtubePublic
        .filter((x) => !idsDescargados.has(x.snippet.resourceId.videoId))
        .map((x) => ({ ...x, id: x.snippet.resourceId.videoId }));
    },
  },
};
</script>

<style scoped lang="scss">
.channel-list {
  text-align: initial;
}
</style>
