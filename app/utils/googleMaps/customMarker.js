module.exports = function(latLng, map, className, content, hoverEvent) {
    //var bounds = new google.maps.LatLng(lat, lng);

    return new CustomOverlay(latLng, map, className, content, hoverEvent || function () {});
};

CustomOverlay.prototype = new google.maps.OverlayView();

function CustomOverlay(bounds, map, className, content, hoverEvent) {
    this.latLng = bounds;
    this.content = content;
    this.hoverEvent = hoverEvent;
    this.className = className;

    this.div_ = null;

    this.setMap(map);
}

CustomOverlay.prototype.onAdd = function () {
    var div = document.createElement('div');
    div.className = this.className;

    var that = this;

    div.onmouseover = function () {
        that.hoverEvent(that.content);
    };

    div.onmouseout = function () {
        that.hoverEvent({});
    };

    this.div_ = div;

    var panes = this.getPanes();
    panes.floatPane.appendChild(div);
};

CustomOverlay.prototype.onHighlighted = function () {
    this.div_.classList.add('highlighted');
};

CustomOverlay.prototype.offHighlighted = function () {
    if (this.div_) {
        this.div_.classList.remove('highlighted');
    }
};

CustomOverlay.prototype.draw = function () {
    if (this.latLng) {
        var overlayProjection = this.getProjection();

        var sw = overlayProjection.fromLatLngToDivPixel(this.latLng);

        var div = this.div_;
        var width = div.offsetWidth;
        var height = div.offsetHeight;

        div.style.left = (sw.x - (width / 2)) + 'px';
        div.style.top = (sw.y - height) + 'px';
    }
    else {
        this.div_.style.display = 'none';
    }
};

CustomOverlay.prototype.onRemove = function () {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
};

