module LastFMDataVis.Data {

    export interface ILastFMService {
        getTopArtists() : ng.IPromise<Artist[]>;
    }

    export interface Artist {
        name : string;
        /** Id from lastFM **/
        mbid : string;
    }

    export class MockLastFMService implements ILastFMService{

        constructor(private $q : ng.IQService){

        }

        getTopArtists: () => ng.IPromise<Artist[]> = () => {
            //returns static data cut from a lastfm call
            return this.$q.when([{"name":"David Bowie","playcount":"153472285","listeners":"4116353","mbid":"5441c29d-3602-4898-b1a1-b77fa23b8e50","url":"http://www.last.fm/music/David+Bowie","streamable":"0"},
                {"name":"Coldplay","playcount":"322733687","listeners":"6295832","mbid":"cc197bad-dc9c-440d-a5b5-d52ba2e14234","url":"http://www.last.fm/music/Coldplay","streamable":"0"},
                {"name":"Justin Bieber","playcount":"38467206","listeners":"2496872","mbid":"e0140a67-e4d1-4f13-8a01-364355bee46e","url":"http://www.last.fm/music/Justin+Bieber","streamable":"0"},
                {"name":"The Beatles","playcount":"457325759","listeners":"4070584","mbid":"b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d","url":"http://www.last.fm/music/The+Beatles","streamable":"0"},
                {"name":"Adele","playcount":"108473240","listeners":"3811459","mbid":"cc2c9c3c-b7bc-4b8b-84d8-4fbd8779e493","url":"http://www.last.fm/music/Adele","streamable":"0"}]);
        };

    }

    export class LastFMService implements ILastFMService{

        constructor(private $http: ng.IHttpService,
                    private lastFMBaseUrl : string, private apiKey : string){

        }

        getTopArtists: () => ng.IPromise<Artist[]> = () => {
            return this.getJsonData(this.getUrl('chart.getTopArtists'))
                .then((result : any)=>{
                    return result.data.artists.artist;
                });
        };

        private getUrl = (method:string, extraParameters?:string) :string => {
            var url = `${this.lastFMBaseUrl}?method=${method}&api_key=${this.apiKey}&format=json`;
            if (extraParameters !== undefined){
                url+= "&" + extraParameters;
            }
            return url;
        };

        private getJsonData = <T>(url: string): ng.IPromise<T> => {
            return this.$http.get(url)
                .success((result : any) => {
                    console.log(result);
                    return angular.fromJson(result);
                }).error((msg, code) => {
                    //TODO: error handling
                });
        };

    }

}