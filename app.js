var express = require('express'),
    http = require('http'),
    app = express(),
    legacyApp = express(),
    documentationApp = express(),
    swig = require('swig'),
    fs = require('fs'),
    path = require('path'),
    router = require(__dirname + '/config/routes')(express),
    docConfig = require(__dirname + '/config/config'),
    legacyPages = require('./legacy_pages');

global.appRootPath = path.resolve(__dirname);
global.__appDocConfig = docConfig;

app.set('env', process.env.MODE || 'development');
app.set('port', process.env.PORT || 8080);


//ENB modules for auto build
if(app.get('env') == 'development'){
    var bemMiddleware = require('enb/lib/server/server-middleware').createMiddleware(),
        bemBuilder = require('enb/lib/server/server-middleware').createBuilder(),
        dropRequireCache = require('enb/lib/fs/drop-require-cache'),
        BEM = require('bem'),
        VM = require('vm');

    app.use(bemMiddleware);
}

//Swig settings for legacy templates
legacyApp.engine('html', swig.renderFile);
legacyApp.set('view engine', 'html');
legacyApp.set('views', __dirname + '/views');
legacyApp.set('view cache', false);
swig.setDefaults({ cache: false });

//mount css/js/images
app.use('/static', express.static(__dirname + '/static'));
app.use('/pages', express.static(__dirname + '/pages'));
app.use('/pages-mobile', express.static(__dirname + '/pages-mobile'));
app.use('/' + __appDocConfig.examplesDir, express.static(__dirname + '/' +  __appDocConfig.examplesDir));
app.use(__appDocConfig.desktopBundlesDir, express.static(__dirname + __appDocConfig.desktopBundlesDir));

//mount old pages
app.use('/views/static_pages', express.static(__dirname + '/views/static_pages'));

for(var i = 0, len = legacyPages.length; i < len; i += 1){
    for(var j = 0, pLen = legacyPages[i]['pages'].length; j < pLen; j += 1){
        if(legacyPages[i]['bem']){
            app.get('/' + legacyPages[i]['pages'][j]['url'], (function(tplPath, url){
                var splitedPath = tplPath.split(path.sep);
                return function(req, res, next){
                    if(app.get('env') == 'development'){
                        var bemhtmlPath =  tplPath + '/' + splitedPath[splitedPath.length - 1] + '.bemhtml.js',
                            bemjsonPath = tplPath + '/' + splitedPath[splitedPath.length - 1] + '.bemjson.js';

                        BEM.util.readFile(bemjsonPath).then(function(c){
                            bemBuilder(bemhtmlPath).then(function(path){
                                var bemhtml;
                                dropRequireCache(require, path);
                                dropRequireCache(require, c);
                                bemhtml = require(path);
                                //next();
                                res.end(bemhtml.BEMHTML.apply(VM.runInThisContext(c)));
                            }, next);
                        });
                    }else{
                        fs.readFile (tplPath + '/' + splitedPath[splitedPath.length - 1] + '.html', function(err, data){
                            if(err){
                                throw err;
                            }
                            res.end(data);
                        })
                    }
                }
            })(legacyPages[i]['pages'][j]['templatePath'], legacyPages[i]['pages'][j]['url']));
        }else{
            legacyApp.get('/' + legacyPages[i]['pages'][j]['url'], (function(tplPath){
                return function(req, res){
                    var showDealers = false;
                    if(/adverts/.test(req.path)){
                        showDealers = true;
                    }
                    res.render('pages/' + tplPath, {'showDealersBlock': showDealers, 'protocol': process.env.VIEW_PROTOCOL || req.protocol, 'host': process.env.VIEW_HOST ||  req.hostname, 'port': process.env.VIEW_PORT || 8080});

                }
            })(legacyPages[i]['pages'][j]['url']));
        }
    }
}

legacyApp.get('/', function(req, res){
    res.render('index', {pagesGroups: legacyPages});
});

// rewrite path to images/scripts on static pages
app.get(/^\/(images|dev)\/.{0,}$/, function(req, res){
    //change old path to scripts on static pages
    var path = req.path.replace(/\/dev/, '/js');
    res.redirect('/static' + path);
});

//mount legacy templates
app.use('/', legacyApp);
documentationApp.use(router);
app.use(/(\/desktop\.blocks)|(\/mobile\.blocks)/, documentationApp);


var server = app.listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
