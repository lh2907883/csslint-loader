# csslint-loader
csslint-loader for webpack, 具体配置如下:

```javascript
	{
		loader: 'csslint-loader',
		options: {
			//设置成true,在遇到不合法的css时会打断webpack的build过程
			force: false,
			//默认应用的rules, 1表示警告, 2表示错误
			//具体规则详见 https://github.com/lh2907883/csslint/tree/master/src/rules
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
		}
  	}
```