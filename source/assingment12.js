let spec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    description: "A map depicting illness in the United States",
    width: 960,
    height: 500,
    autosize: "none",
    data:[
        {
            name: "exports",
            url: "https://raw.githubusercontent.com/niklauswetter/CSC444_Assignment12/main/source/stateresources.csv",
            format: {type: "csv"}
        },
        {
            name: "states",
            url: "https://raw.githubusercontent.com/vega/vega/main/docs/data/us-10m.json",
            format: {"type": "topojson", "feature": "states"},
            transform: [
                {
                    type: "lookup",
                    from: "exports",
                    key: "id",
                    fields: ["id"],
                    values: ["resource"]
                }
            ]
        }
    ],
    scales: [
        {
            name: "fillScale",
            type: "ordinal",
            domain: {data: "exports", field: "resource"},
            range: {scheme: "category20"}
        }
    ],
    projections: [
        {
            name: "projection",
            type: "albersUSA"
        }
    ],
    marks: [
        {
            type: "shape",
            from: {data: "states"},
            encode: {
                update: {
                    fill: {field: "export", scale: "fillScale"}
                }
            },
            transform: [
                {
                    type: "geoshape",
                    projection: "projection"
                }
            ]
        }
    ],
    legends: [
        {
            fill: "fillScale",
            orient: "left-bottom"
        }
    ]
};

let runtime = vega.parse(spec);

let view = new vega.View(runtime).logLevel(vega.Error).renderer("svg").initialize("#view").hover();

view.run();

console.log("Vega datasets:", view._runtime.data, "\nVega signals:", view._signals);