block('b-button')(
    match(function(){ return !this.ctx.tag })(
        tag()('button'),
        content()(function(){
            var result = [];

            if(this.mods.theme == 'arrow'){
                result.push({
                    elem: 'text',
                    mix: { block: 'b-link', mods: { dashed: true } },
                    content: applyNext()
                });

                result.push({
                    block: 'b-ico',
                    mods: { type: 'arrow' }
                })
            }else{
                result.push({
                    elem: 'text',
                    content: applyNext()
                });
            }

            return result
        })
    ),
    match(function(){ return this.ctx.ico })(
        mix()(function(){
            var ctx = this.ctx;
            return { block: ctx.ico.block, mods: ctx.ico.mods }
        })
    ),
    attrs()(function(){
        var attrs = {};
        attrs.type = this.ctx.type ? this.ctx.type : 'button'; // button, submit and etc
        (this.mods.locked)? attrs.disabled = 'disabled' : '';  //locked
        return attrs;
    }),

    elem('text')(
        tag()('span')
    )
)