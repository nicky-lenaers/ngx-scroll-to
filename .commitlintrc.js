const typeEnum = require('@commitlint/config-angular-type-enum');

module.exports = {
  extends: [
    '@commitlint/config-angular'
  ],
  rules: {
    'type-enum' : [
      typeEnum.rules['type-enum'][0],
      typeEnum.rules['type-enum'][1],
      [
        ...typeEnum.rules['type-enum'][2],
        'release'
      ]
    ]
  }
};
