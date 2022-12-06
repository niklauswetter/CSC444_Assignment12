let spec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    description: "A map depicting illness in the United States",
    width: 960,
    height: 500,
    autosize: "none",
    data:[
        {
            name: "exports",
            url: "./stateresources.csv",
            format: {type: "csv"}
        }
    ]
};

let runtime = vega.parse(spec);

let view = new vega.View(runtime).logLevel(vega.Error).renderer("svg").initialize("#view").hover();

view.run();

console.log("Vega datasets:", view._runtime.data, "\nVega signals:", view._signals);