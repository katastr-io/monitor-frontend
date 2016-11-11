Monitor.Info = {
    init: function() {
        this._listenDatachange();
    },
    _listenDatachange: function() {
        document.querySelector(".info").addEventListener("datachange", (e) => {
            let cadastre = Monitor.Data.getCurrent();
            let avgArea = parseInt(cadastre.celkova_vymera[0] / cadastre.celkovy_pocet_parcel[0]);
            document.querySelector(".info small")
                .innerHTML = `výměra: ${(cadastre.celkova_vymera[0]/10000).toFixed(2)} ha /
                    počet parcel: ${cadastre.celkovy_pocet_parcel[0]} /
                    průměrná výměra parcely: ${avgArea} m<sup>2</sup>`;
        });
    }
}

Monitor.Info.init();
