module.exports = function(config) {
    var legacyPages = require('../legacy_pages'),
        bemPages = [],
        techs = {
            // essential
            fileProvider: require('enb/techs/file-provider'),
            fileMerge: require('enb/techs/file-merge'),
            // optimization
            borschik: require('enb-borschik/techs/borschik'),
            // css
            stylus: require('enb-stylus/techs/stylus'),
            // bemtree
            bemtree: require('enb-bemxjst/techs/bemtree-old'),
            // bemhtml
            bemhtml: require('enb-bemxjst/techs/bemhtml'),
            //html
            htmlFromJSON: require('enb-bemxjst/techs/html-from-bemjson'),
            htmlBeautify: require('enb-beautify/techs/enb-beautify-html'),
            // js
            browserJs: require('enb-diverse-js/techs/browser-js'),
            prependYm: require('enb-modules/techs/prepend-modules'),
            js: require('enb/techs/js')
        },
        enbBemTechs = require('enb-bem-techs'),
        naming = require('bem-naming');

    for (var i = 0, len = legacyPages.length; i < len; i += 1) {
        for (var j = 0, pLen = legacyPages[i]['pages'].length; j < pLen; j += 1) {
            bemPages.push(legacyPages[i]['pages'][j]['templatePath']);
        }
    }

    /**
     *   BEM bundles(desktop, mobile)
     *   Десктоп: pages/*
     *   Мобильная: pages-mobile/*
     */

    config.nodes(bemPages, function (nodeConfig) {
        var path = nodeConfig.getPath();
        nodeConfig.addTechs([
            [require('enb-bem-techs/techs/levels'), {levels: getLevels(config, path)}],
            [techs.fileProvider, {target: '?.bemjson.js'}],
            [enbBemTechs.bemjsonToBemdecl],
            [enbBemTechs.depsOld, {strict: true}],
            [enbBemTechs.files],
            //CSS
            [techs.stylus, {
                target: '?.css',
                autoprefixer: {browsers: ["> 2%", "last 2 versions", "Firefox ESR", "Opera 12.1", "Android >= 4", "iOS >= 5"]}
            }],
            //BEMHTML
            [techs.bemhtml, {sourceSuffixes: ['bemhtml', 'bemhtml.js']}],
            //HTML
            [techs.htmlFromJSON],
            [techs.htmlBeautify],
            //client JS
            [techs.browserJs],
            [techs.fileMerge, {target: '?.pre.js', sources: ['?.bemhtml.js', '?.browser.js']}],
            [techs.prependYm, {source: '?.pre.js'}]
        ]);

        nodeConfig.mode('production', function (nodeConfig) {
            //CSS
            nodeConfig.addTechs([
                [techs.stylus, {
                    target: '_?.css',
                    autoprefixer: {browsers: ["> 2%", "last 2 versions", "Firefox ESR", "Opera 12.1", "Android >= 4", "iOS >= 5"]},
                    compress: true
                }]
            ]);
            nodeConfig.addTechs([
                //BORSCHIK
                [techs.borschik, {sourceTarget: '?.js', destTarget: '_?.js', freeze: true, minify: true}]
            ]);
            nodeConfig.addTargets(['_?.css', '_?.js']);
        })

        nodeConfig.addTargets(['?.js', '?.css', '?.html', '?.browser.js', '?.beauty.html']);
    });
}

function getLevels(config, path) {
    var mobile = /pages-mobile/.test(path) ? true : false;
    return [
        {path: 'bower_components/bem-core/common.blocks', check: false},
        {path: 'desktop.blocks', check: true},
        ((mobile)? { path: 'mobile.blocks', check: true } : '')
    ].map(function(levelPath) { return config.resolvePath(levelPath); });
}
