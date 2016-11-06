Monitor.Info = {
    init: function() {
        this._listenDatachange();
    },
    _listenDatachange: function() {
        document.querySelector(".info").addEventListener("datachange", (e) => {
            let cadastre = Monitor.Data.getCurrent();
            document.querySelector(".info small")
                .innerHTML = `výměra: ${(cadastre.celkova_vymera/10000).toFixed(2)} ha / počet parcel: ${cadastre.celkovy_pocet_parcel}`;
        });
    }
}

Monitor.Info.init();
