module.exports = class EchartsWatermarkWebpackPlugin {
    constructor(options) {
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('EchartsWatermarkWebpackPlugin', (compilation, callback) => {
            const assets = compilation.assets
            Object.keys(assets).forEach(item => {
                console.log(item)
            })
            callback()
        });
    }
}