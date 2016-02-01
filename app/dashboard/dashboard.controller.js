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
                this.artists = [];
                this.getArtists();
            }
            DashboardController.prototype.getArtists = function () {
                var _this = this;
                this.lastFmService.getTopArtists().then(function (newArtists) {
                    _this.artists = newArtists;
                });
            };
            return DashboardController;
        })();
        Dashboard.DashboardController = DashboardController;
    })(Dashboard = LastFMDataVis.Dashboard || (LastFMDataVis.Dashboard = {}));
})(LastFMDataVis || (LastFMDataVis = {}));
//# sourceMappingURL=dashboard.controller.js.map