/**
 * Displays data from LastFM
 */
var LastFMDataVis;
(function (LastFMDataVis) {
    var Dashboard;
    (function (Dashboard) {
        var DashboardController = (function () {
            function DashboardController(lastFmService) {
                this.lastFmService = lastFmService;
                this.artistsLimit = 20;
                this.artists = [];
                this.datapoints = [];
                this.getArtists();
            }
            DashboardController.prototype.getArtists = function () {
                var _this = this;
                this.lastFmService.getTopArtists(this.artistsLimit).then(function (newArtists) {
                    _this.artists = newArtists;
                    _this.datapoints = _this.artists.map(function (a) {
                        {
                            //TODO: check artists are ordered by playcount, not listeners in the last fm order
                            //TODO: add appropriate onclick event
                            return { label: a.name, value: a.playcount, onclick: function () { } };
                        }
                    });
                });
            };
            return DashboardController;
        })();
        Dashboard.DashboardController = DashboardController;
    })(Dashboard = LastFMDataVis.Dashboard || (LastFMDataVis.Dashboard = {}));
})(LastFMDataVis || (LastFMDataVis = {}));
//# sourceMappingURL=dashboard.controller.js.map