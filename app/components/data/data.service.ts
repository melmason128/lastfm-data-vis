module LastFMDataVis.Data {

    export interface ILastFMService {
        getTopArtists() : ng.IPromise<Artist[]>;
    }

    export interface Artist {
        name : string;
        /** Id from lastFM **/
        mbid : string;
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