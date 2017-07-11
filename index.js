var loaderUtils = require("loader-utils");
var CSSLint = require("csslint").CSSLint;

/**
 * source为原文件的字符串格式
 */
module.exports = function(source, map) {
    var query = loaderUtils.getOptions(this) || {
        // 'box-model': 1,
        'display-property-grouping': 1,
        'duplicate-properties': 1,
        'empty-rules': 1,
        'known-properties': 1,
        'ids': 1,
        'multi-rules-newline': 1,
        'rule-name': 1
    };
    //对source进行解析
    var results = CSSLint.verify(source, query.rules);
    if (results.messages.length > 0) {
        var strError = `In ${this.resourcePath}\n`;
        strError += results.messages.map(item => {
            return `    ${item.message} line:${item.line}, col:${item.col}, ${item.evidence}\n`;
        }).join('');
        if (query.force === true) {
            this.emitError(strError);
        } else {
            console.log(strError);
        }
    }
    return source;
}