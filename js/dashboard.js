Monitor.Dashboard = {
    init: function() {
        this._listenDatachange();
    },
    _listenDatachange: function() {
        document.querySelector(".chart").addEventListener("datachange", this._redraw.bind(this));
        document.querySelector(".chart").addEventListener("datechange", this._redraw.bind(this));
        document.querySelector(".line-chart").addEventListener("linetypechange", this._redraw.bind(this));
    },
    _redraw: function() {
        this._showHeadings();
        this.Chart.drawLegend();
        this.Chart.drawSvgChart("areaRatio", ".chart .area");
        this.Chart.drawSvgChart("parcelRatio", ".chart .parcel");
        this.Chart.drawSvgChart("parcelAvgArea", ".chart .parcel-avg-area");
        this.Chart.drawSvgLineChart();
    },
    _showHeadings: function() {
        document.querySelectorAll("h2").forEach((elm) => {
            elm.style.display = "block";
        });
        document.querySelector(".line-chart").style.visibility = "visible";
    }
}

Monitor.Dashboard.init();
