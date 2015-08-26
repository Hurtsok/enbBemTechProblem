var path = require('path');

module.exports = [
    {
        title: 'Bem pages',
        searchTag: 'bempages',
        bem: true,
        pages: [
            { title: 'Тестовая', url: 'main/index', templatePath: 'pages' + path.sep + 'index' }
        ]
    },
]

