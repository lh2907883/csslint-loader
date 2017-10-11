var loaderUtils = require("loader-utils");
var CSSLint = require("csslint").CSSLint;
/**
 * source为原文件的字符串格式
 */
module.exports = function(source, map) {    
    this.cacheable();
    // var option = this._compiler.options.csslint || {
    var option = loaderUtils.getOptions(this) || {
        force: false,
        rules: {
            // 'box-model': 1,
            'display-property-grouping': 1,
            'duplicate-properties': 1,
            'empty-rules': 1,
            'known-properties': 1,
            'ids': 1,
            'multi-rules-newline': 1,
            'rule-name': 1
        }
    };
    /*
     *  exclude: function(file){
     *      //file是当前处理的资源路径
     *      return true; 表示不对当前资源做检查
     *  }
     */
    if(option.exclude){
        if(option.exclude(this.resourcePath)){
            return source;
        }
    }
    //对source进行解析
    var results = CSSLint.verify(source, option.rules);
    if (results.messages.length > 0) {
        var strError = `In ${this.resourcePath}\n`;
        strError += results.messages.map(item => {
            return `    ${item.message} @ line:${item.line}, col:${item.col}, ${item.evidence}\n`;
        }).join('');
        if (option.force === true) {
            this.emitError(strError);
        } else {
            this.emitWarning(strError);
        }
    }
    return source;
}