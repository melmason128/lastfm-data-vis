/**
 * Displays data from LastFM
 */
module LastFMDataVis.Dashboard {

    import Artist = LastFMDataVis.Data.Artist;
    export class DashboardController {

        constructor(private lastFmService : Data.ILastFMService){
            this.getArtists();
        }

        artists : Artist[] = [];
        datapoints : Barchart.IDatapoint[] = [];

        getArtists(){
            this.lastFmService.getTopArtists().then((newArtists : Data.Artist[])=>{
                this.artists = newArtists;
                this.datapoints = this.artists.map((a)=>{
                    {
                        //TODO: check artists are ordered by playcount, not listeners in the last fm order
                        return {label: a.name, value: a.playcount};
                    }
                });
            });
        }

    }


}