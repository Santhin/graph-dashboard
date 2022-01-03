<template>
  <body>
    <label for="site-search">Search the site:</label>
    <input type="search" id="site-search" />
    <button v-on:click="drawGraph()">Szukaj</button>
    <div id="viz" class="graph"></div>
  </body>
</template>

<script>
import NeoVis from "neovis.js";

export default {
  methods: {
    drawGraph() {
      var website = document.getElementById("site-search").value;
      var config = {
        encrypted: "ENCRYPTION_ON",
        container_id: "viz",
        server_url: this.$config.server_url,
        server_user: this.$config.server_user,
        server_password: this.$config.server_password,
        server_database: this.$config.server_database,
        labels: {
          Website: {
            caption: "value",
          },
          Category: {
            caption: "value",
          },
          Platform: {
            caption: "value",
          },
          ImieNazwisko: {
            caption: "value",
          },
          Date_Cat: {
            caption: "value",
          },
          Firma: {
            caption: "value",
          },
          Website_Size: {
            caption: "value",
          },
        },
        relationships: {
          HAS_CATEGORY: {
            caption: false,
          },
          HAS_COMPANY: {
            caption: false,
          },
          HAS_DATE_CAT: {
            caption: false,
          },
          HAS_PLATFORM: {
            caption: false,
          },
          HAS_WEBSTIE: {
            caption: false,
          },
          HAS_WEBSITE_SIZE: {
            caption: false,
          },
        },
        initial_cypher: `MATCH (w:Website)-[r:HAS_CATEGORY]->(c:Category) WHERE w.value = '${website}' RETURN w,r,c`,
      };

      var viz = new NeoVis(config);
      viz.render();
      viz.registerOnEvent("completed", (e) => {
        viz["_network"].on("click", (event) => {
          var last_click = null;
          last_click = event.nodes;
          if (last_click[0]) {
            viz.updateWithCypher(
              `MATCH (a)-[r]-(b) WHERE ID(a) = ${last_click} RETURN a, r, b LIMIT 5`
            );
          }
        });
      });
    },
  },
};
</script>

