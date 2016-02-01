var LastFMDataVis;
(function (LastFMDataVis) {
    var Data;
    (function (Data) {
        var LastFMService = (function () {
            function LastFMService($http, lastFMBaseUrl, apiKey) {
                var _this = this;
                this.$http = $http;
                this.lastFMBaseUrl = lastFMBaseUrl;
                this.apiKey = apiKey;
                this.getTopArtists = function () {
                    return _this.getJsonData(_this.getUrl('chart.getTopArtists'))
                        .then(function (result) {
                        return result.data.artists.artist;
                    });
                };
                this.getUrl = function (method, extraParameters) {
                    var url = _this.lastFMBaseUrl + "?method=" + method + "&api_key=" + _this.apiKey + "&format=json";
                    if (extraParameters !== undefined) {
                        url += "&" + extraParameters;
                    }
                    return url;
                };
                this.getJsonData = function (url) {
                    return _this.$http.get(url)
                        .success(function (result) {
                        console.log(result);
                        return angular.fromJson(result);
                    }).error(function (msg, code) {
                        //TODO: error handling
                    });
                };
            }
            return LastFMService;
        })();
        Data.LastFMService = LastFMService;
    })(Data = LastFMDataVis.Data || (LastFMDataVis.Data = {}));
})(LastFMDataVis || (LastFMDataVis = {}));
//# sourceMappingURL=data.service.js.map