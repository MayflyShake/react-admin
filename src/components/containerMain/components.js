const files = require.context("../../views/", true, /\.js$/);
const components = [];
files.keys().map(key => {
    if (key.includes("./index/") || key.includes("./login/")) {
        return false;
    }
    const splitFileName = key.split(".");
    const path = `/index${splitFileName[1].toLowerCase()}`;
    const component = files(key).default;
    components.push({
        path, component
    })
})

export default components;