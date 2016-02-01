/**
 * Displays data from LastFM
 */
module LastFMDataVis.Dashboard {

    export class DashboardController {

        constructor(private lastFmService : Data.ILastFMService){
            this.getArtists();
        }

        artists = [];

        getArtists(){
            this.lastFmService.getTopArtists().then((newArtists : Data.Artist[])=>{
                this.artists = newArtists;
            });
        }

    }


}