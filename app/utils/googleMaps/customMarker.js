module.exports = function(latLng, map, className, tooltipDiv, hoverEvent) {
    //var bounds = new google.maps.LatLng(lat, lng);

    return new CustomOverlay(latLng, map, className, tooltipDiv, hoverEvent || function () {});
};

CustomOverlay.prototype = new google.maps.OverlayView();

function CustomOverlay(bounds, map, className, tooltipDiv, hoverEvent) {
    this.latLng = bounds;
    this.hoverEvent = hoverEvent;
    this.className = className;

    this.markerDiv = document.createElement('div');
    this.markerDiv.className = this.className;

    if (tooltipDiv) {
        this.tooltipDiv = tooltipDiv;
        this.tooltipDiv.className = 'tooltip';
    }

    this.setMap(map);
}

CustomOverlay.prototype.onAdd = function () {
    var that = this;

    this.markerDiv.onclick = function () {
        that.hoverEvent(that.content);
        that.markerDiv.className = that.className + ' marker-active';
        if (that.tooltipDiv) {
            that.tooltipDiv.className = 'tooltip tooltip-active';
        }
        return false;
    };

    this.markerDiv.onmouseout = function () {
        that.hoverEvent({});
    };

    var panes = this.getPanes();

    if (this.tooltipDiv) {
        panes.floatPane.appendChild(this.tooltipDiv);
    }
    panes.floatPane.appendChild(this.markerDiv);
};

CustomOverlay.prototype.onHighlighted = function () {
    this.markerDiv.classList.add('highlighted');
};

CustomOverlay.prototype.offHighlighted = function () {
    if (this.markerDiv) {
        this.markerDiv.classList.remove('highlighted');
    }
};

CustomOverlay.prototype.positionDivOnMap = function(div, sw) {
    var width = div.offsetWidth;
    var height = div.offsetHeight;

    div.style.left = (sw.x - (width / 2)) + 'px';
    div.style.top = (sw.y - height) + 'px';
};

CustomOverlay.prototype.draw = function () {
    if (this.latLng) {
        var overlayProjection = this.getProjection();

        var sw = overlayProjection.fromLatLngToDivPixel(this.latLng);

        this.positionDivOnMap(this.markerDiv, sw);
        if (this.tooltipDiv) {
            this.tooltipDiv.style.display = 'block';
            this.positionDivOnMap(this.tooltipDiv, sw);
            this.tooltipDiv.style.display = '';
        }
    }
    else {
        this.markerDiv.style.display = 'none';
    }
};

CustomOverlay.prototype.onRemove = function () {
    this.markerDiv.parentNode.removeChild(this.markerDiv);
    this.markerDiv = null;
};

