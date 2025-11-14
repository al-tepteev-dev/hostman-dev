<template>
  <NewContent :header="header" header-justify="center" header-margin-size="24" :width="$attrs['width']">
    <GMap
      ref="gMap"
      :class="$style.map"
      language="en"
      :center="{ lat: locations[0].lat, lng: locations[0].lng }"
      :options="{
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      }"
      :zoom="15"
    >
      <GMapMarker v-for="location in locations" :key="location.id" :position="{ lat: location.lat, lng: location.lng }">
      </GMapMarker>
    </GMap>
  </NewContent>
</template>

<script lang="ts">
import Vue from "vue";
import NewContent from "@/components/New/Content/index.vue";

export default Vue.extend({
  name: "NewBlockMap",

  components: { NewContent },

  data() {
    return {
      header: {
        title: "HOSTMAN LTD",
        subtitle: "28 Oktovriou, 367, Mediterranean Court, Floor 1, Office A5, 3107, Limassol, Cyprus",
      },
      locations: [
        {
          lat: 34.6881622,
          lng: 33.0677202,
        },
      ],
    };
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";
.map {
  border-radius: var(--border-card);
  height: 394px;
  overflow: hidden;

  :global(.GMap__Wrapper) {
    height: 100%;
  }
}
</style>
