const AbstractService = require('@jeneric/core/web/abstract-service');

class Pages extends AbstractService {

    constructor() {
        super();

        this._$site = $('.site');
        this._$pages = $('.page');
        this._$pageWrapper = $('.pages');

        this._scrollTouchStart = null;
        this._index = 0;

        this.update();
    }

    get $site() {
        return this._$site;
    }

    get $pages() {
        return this._$pages;
    }

    get $pageWrapper() {
        return this._$pageWrapper;
    }

    get windowWidth() {
        return $(window).outerWidth();
    }

    update() {

        this._$site.css({
            width: this.windowWidth
        });

        this._$pageWrapper.css({
            width: Math.round(this.windowWidth * this.$pages.length)
        });

        this.$pages.each(function (p, page) {
            let $page = $(page);

            $page.css({
                width: this.windowWidth
            });

        }.bind(this));

        this.scroll(0);

    }

    touchstart() {
        this._scrollTouchStart = this.$site.scrollLeft();
    }

    touchend() {

        let scrollLeft = this.$site.scrollLeft();

        if(this._scrollTouchStart < this.$site.scrollLeft()) {

            if(scrollLeft % this.windowWidth > this.windowWidth * 0.2) {
                this.scroll(1);
            } else {
                this.scroll(0);
            }

        } else if(this._scrollTouchStart > this.$site.scrollLeft()) {
            if(scrollLeft % this.windowWidth < this.windowWidth * 0.8) {
                this.scroll(-1);
            } else {
                this.scroll(0);
            }
        }
    }

    scroll(direction) {
        let newIndex = this._index + direction;

        if(newIndex < 0 || newIndex - 1 > this._$pages.length) return false;

        this._$site.animate({
            'scrollLeft': this.windowWidth * newIndex
        }, {
            duration: 100,
            complete: function() {
                this._index = newIndex
            }.bind(this)
        });

    }

}

module.exports = Pages;
