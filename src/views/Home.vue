<template>
  <div class="home">
    <Render :key="$store.state.reRenderKey"/>
  </div>
</template>

<script>
import Render from '@/components/Render';


export default {
  components: {
    Render,
  },
  name: "Home",
};
</script>
