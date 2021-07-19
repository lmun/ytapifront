/* eslint-disable max-len */
<template>
  <div class="home">
    <section class="section channel-list">
      <div class="container">
        <div class="columns is-multiline">
          <ChannelCard v-for="canal in canalesOrdenados" :key="canal.id" :channelInfo="canal">
          </ChannelCard>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable max-len */
// @ is an alias to /src
import { get } from '@/api/api';
import ChannelCard from '@/components/ChannelCard.vue';

export default {
  name: 'Canales',
  data() {
    return {
      canales: [],
    };
  },
  components: {
    ChannelCard,
  },
  async mounted() {
    try {
      this.canales = await get('canales/all');
    } catch (error) {
      console.log(error.message);
    }
    console.log(this.canales);
  },
  computed: {
    canalesOrdenados() {
      return this.canales
        .map((x) => ({ f: new Date(x.snippet.publishedAt), x }))
        .sort((a, b) => a.f - b.f)
        .map((x) => x.x);
    },
  },
};
</script>

<style scoped lang="scss">
.channel-list {
  text-align: initial;
}
</style>
