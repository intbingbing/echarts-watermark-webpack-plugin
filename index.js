module.exports = class EchartsWatermarkWebpackPlugin {
    constructor(options) {
        this.options = Object.assign({
            text: 'TEXT', size: 100, alpha: 0.08, font: '20px Microsoft Yahei', rotate: 45
        }, options);
        this.options.rotate = -this.options.rotate / 180 * Math.PI
    }

    apply(compiler) {
        const regex = /setOption\(.+?\)/g;
        const options = JSON.stringify(this.options).replaceAll('"', "'");
        compiler.hooks.emit.tapAsync('AddClickPrefixPlugin', (compilation, callback) => {
            const assets = compilation.assets
            Object.keys(assets).forEach(item => {
                if (item.endsWith('.js')) {
                    let source = assets[item].source();
                    const newSource = source.replace(regex, params => {
                        const oldInput = /\((.*?)\)/g.exec(params)[1]
                        const newInput = `setOption((function name() {function getBackgroundCanvas({text, size, alpha, font, rotate}){const waterMarkText = text;const canvas = document.createElement('canvas');const ctx = canvas.getContext('2d');canvas.width = canvas.height = size;ctx.textAlign = 'center';ctx.textBaseline = 'middle';ctx.globalAlpha = alpha;ctx.font = font;ctx.translate(50, 50);ctx.rotate(rotate);ctx.fillText(waterMarkText, 0, 0);return canvas};${oldInput}.backgroundColor={type: 'pattern',image: getBackgroundCanvas(${options}),repeat: 'repeat'};return ${oldInput};})())`
                        return newInput
                    })
                    assets[item] = {
                        source: () => newSource,
                        size: () => newSource.length
                    }
                }
            })
            callback()

        });
    }
}