# echarts-watermark-webpack-plugin

# Usage

```javascript
const EchartsWatermarkWebpackPlugin = require('echarts-watermark-webpack-plugin');

module.exports = {
    plugins: [
      new EchartsWatermarkWebpackPlugin({
        text: 'Text', size: 100, alpha: 0.3, font: '18px Microsoft Yahei', rotate: 45
      })
    ]
}

```
