import NeoVis from 'neovis.js';

export function drawGraph() {
    var website = document.getElementById("site-search").value;
    var config = {
        container_id: "viz",
        server_url: "neo4j://5e1fc1bf.databases.neo4j.io:7687",
        server_user: "neo4j",
        server_password: "tdexFZvT78ElAw8H47omFM8bFIk6KVD86zKA64UDLFQ",
        server_database: 'neo4j',
        labels: {
            "Website": {
                "caption": "value",
            },
            "Category": {
                "caption": "value",
            },
            "Platform": {
                "caption": "value",
            },
            "ImieNazwisko": {
                "caption": "value",
            },
            "Date_Cat": {
                "caption": "value",
            },
            "Firma": {
                "caption": "value",
            },
            "Website_Size": {
                "caption": "value",
            }
        },
        relationships: {
            "HAS_CATEGORY": {
                "caption": false,
            },
            "HAS_COMPANY": {
                "caption": false,
            },
            "HAS_DATE_CAT": {
                "caption": false,
            },
            "HAS_PLATFORM": {
                "caption": false,
            },
            "HAS_WEBSTIE": {
                "caption": false,
            },
            "HAS_WEBSITE_SIZE": {
                "caption": false,
            },
        },
        // initial_cypher: `MATCH (w:Website)-[r:HAS_CATEGORY]->(c:Category) WHERE w.value = '${website}' RETURN w,r,c`
        initial_cypher: `MATCH (w:Website)-[r:HAS_CATEGORY]->(c:Category) WHERE w.value = 'plicko.pl' RETURN w,r,c`
    }

    var viz = new NeoVis.default(config);
    viz.render();
    console.log(viz);
    viz.registerOnEvent("completed", (e) => {
        viz["_network"].on("click", (event) => {
            var last_click = null
            last_click = event.nodes
            console.log(last_click[0]);
            if (last_click[0]) {
                viz.updateWithCypher(`MATCH (a)-[r]-(b) WHERE ID(a) = ${last_click} RETURN a, r, b LIMIT 5`)
            }


        });
    });

}
