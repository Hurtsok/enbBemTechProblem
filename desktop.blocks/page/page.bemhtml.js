block('page')(
    def().match(function(){ return !this._defPageApplied})(function() {
        this._defPageApplied = true;
        var ctx = this.ctx,
            mediaDesktop = [
                { elem: 'css', url: '/static/jquery.fancybox.css' },
                { elem: 'js', url: '/static/js/jquery-1.11.0.js' },
                { elem: 'js', url: '/static/js/jquery-fancybox/jquery.fancybox.js' },
                { elem: 'js', url: '/static/js/velocity.min.js' },
                { elem: 'js', url: '/static/js/velocity.ui.min.js' },
                { elem: 'js', url: "/static/js/js.js" },
                { elem: 'js', url: '/static/js/utils.js' }
            ],
            mediaMobile = [
                { elem: 'meta',  name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no'},
                { elem: 'meta',  name: 'mobile-web-app-capable', content: 'yes'},
                { elem: 'link', rel: 'apple-touch-icon', href: '/static/images/mobile/icons/apple-touch-icon.png'},
                { elem: 'js', url: '/static/js/jquery-2.1.3.min.js' },
                { elem: 'js', url: '/static/js/velocity.min.js' },
                { elem: 'js', url: '/static/js/velocity.ui.min.js' },
                { elem: 'js', url: '/static/js/fastclick.min.js' },
                { elem: 'js', url: '/static/js/iscroll-infinite-zoom.js' },
                { elem: 'js', url: "/static/js/jquery.imageVerticalCentring.js" },
                { elem: 'css', url: '/static/fotorama.css' },
                { elem: 'js', url: '/static/js/fotorama.js' },
                (function(){
                    if (ctx.pano) {
                        return [
                            { elem: 'js', url: '/static/js/jquery-fancybox/jquery.fancybox.js' },
                            { elem: 'js', url: '/static/js/jquery-fancybox/jquery.fancybox-loading.js' },
                            { elem: 'js', url: '/static/js/jquery-fancybox/jquery.fancybox-title.js' },
                            { elem: 'js', url: '/static/js/jquery-fancybox/jquery.fancybox.smothScrollZoom.js' },
                            { elem: 'css', url: '/static/jquery.fancybox.new-version.css' },
                            { elem: 'js', url: 'http://box.farpost.ru/new_drom/dev/js_panorama/pano2vr_player.js' },
                            { elem: 'js', url: 'http://box.farpost.ru/new_drom/dev/js_panorama/object2vr_player.js' },
                            { elem: 'js', url: '/static/images/skin/panoramas/toyota/auris/inside/skin.js' },
                            { elem: 'js', url: '/static/images/skin/panoramas/toyota/auris/outside/close/skin.js' },
                            { elem: 'js', url: '/static/images/skin/panoramas/toyota/auris/outside/open/skin.js' }
                        ];
                    }
                })(),
                { elem: 'js', url: '/static/js/app.mobile.js' }
            ];

        ctx.concat  = (ctx.concat)? ctx.concat : 'top';
        (!ctx.mobile)? ((ctx.concat == 'bottom')? ctx.head = mediaDesktop.concat(ctx.head) : ctx.head = ctx.head.concat(mediaDesktop)) : ((ctx.concat == 'bottom')? ctx.head = mediaMobile.concat(ctx.head) : ctx.head = ctx.head.concat(mediaMobile));
        applyCtx(ctx);


    }),

    tag()('body'),
    // replace all `.prefixed.css` and `_name.css` to `name.css` for backward capability
    elem('css')(
        attrs()(function(){
            var ctx = this.ctx;
            if(/pages|pages\-mobile/.test(ctx.url)){
                var splitedUrl = ctx.url.split('/');
                var fileName = splitedUrl.pop();
                if(/(^\_)|prefixed/.test(fileName)){
                    splitedUrl.push( fileName.replace(/(^\_)|\.prefixed/g, '') );
                    ctx.url = splitedUrl.join('/');
                }
            }

            return {
                href: ctx.url,
                rel: 'stylesheet'
            }
        })
    ),

    elem('meta')(
        tag()('meta'),
        bem()(false),
        attrs()(function(){
            var attrs = {
                'name': '',
                'content': '',
                'http-equiv': '',
                'charset': ''
            }
            var key, result = {};

            for(key in attrs){
                if(this.ctx[key]){
                    result[key] = this.ctx[key];
                }
            }

            return result;
        })
    ),
    elem('link')(
        tag()('link'),
        bem()(false),
        attrs()(function(){
            var attrs = {
                'rel': '',
                'sizes': '',
                'href': ''
            }
            var key, result = {};

            for(key in attrs){
                if(this.ctx[key]){
                    result[key] = this.ctx[key];
                }
            }

            return result;
        })
    )
);
