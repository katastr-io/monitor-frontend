Monitor.Info = {
    init: function() {
        this._listenDatachange();
    },
    _listenDatachange: function() {
        document.querySelector(".info").addEventListener("datachange", this._update);
        document.querySelector(".info").addEventListener("datechange", this._update);
    },
    _update: function() {
        let cadastre = Monitor.Data.getCurrent();
        let dateIndex = Monitor.Mapper.getDatePosition(Monitor.Data.getCurrentDate());
        let area = (cadastre.celkova_vymera[dateIndex]/10000).toFixed(2);
        let parcelCount = cadastre.celkovy_pocet_parcel[dateIndex];
        let avgArea = parseInt(cadastre.celkova_vymera[dateIndex] / cadastre.celkovy_pocet_parcel[dateIndex]);

        document.querySelector(".info small")
            .innerHTML = `výměra: ${area} ha /
                počet parcel: ${parcelCount} /
                průměrná výměra parcely: ${avgArea} m<sup>2</sup>`;
    }
}

Monitor.Info.init();
