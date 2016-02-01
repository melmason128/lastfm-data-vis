describe('LastFMDataVis',()=>{

    describe('data', ()=>{

        describe('lastfmservice', ()=>{


            var _lastFmService : LastFMDataVis.Data.LastFMService;
            var _baseUrl : string;
            var _$httpBackend : ng.IHttpBackendService;
            var topArtistsUrl : string;

            beforeEach(()=>{angular.mock.module('lastFMDataVisApp')});

            //using httpBackend to mock the Last FM api server
            beforeEach(inject((lastFmService, lastFmApiBaseUrl, $httpBackend, lastFmApiKey)=>{
                _lastFmService = lastFmService;
                _baseUrl = lastFmApiBaseUrl;
                _$httpBackend = $httpBackend;

                topArtistsUrl = `${_baseUrl}?method=chart.getTopArtists&api_key=${lastFmApiKey}&format=json`;

                //abreviated version of response from the last fm server
                _$httpBackend.when('GET', topArtistsUrl)
                    .respond('{"artists":{"artist":[{"name":"David Bowie","playcount":"153472285","listeners":"4116353","mbid":"5441c29d-3602-4898-b1a1-b77fa23b8e50","url":"http://www.last.fm/music/David+Bowie","streamable":"0","image":[{"#text":"http://img2-ak.lst.fm/i/u/34s/937d62bb145040b9b709319c1e680037.png","size":"small"},{"#text":"http://img2-ak.lst.fm/i/u/64s/937d62bb145040b9b709319c1e680037.png","size":"medium"},{"#text":"http://img2-ak.lst.fm/i/u/174s/937d62bb145040b9b709319c1e680037.png","size":"large"},{"#text":"http://img2-ak.lst.fm/i/u/300x300/937d62bb145040b9b709319c1e680037.png","size":"extralarge"},{"#text":"http://img2-ak.lst.fm/i/u/937d62bb145040b9b709319c1e680037.png","size":"mega"}]},{"name":"Coldplay","playcount":"322733687","listeners":"6295832","mbid":"cc197bad-dc9c-440d-a5b5-d52ba2e14234","url":"http://www.last.fm/music/Coldplay","streamable":"0","image":[{"#text":"http://img2-ak.lst.fm/i/u/34s/5bdb5d4c53504627c62f9e30f48e9063.png","size":"small"},{"#text":"http://img2-ak.lst.fm/i/u/64s/5bdb5d4c53504627c62f9e30f48e9063.png","size":"medium"},{"#text":"http://img2-ak.lst.fm/i/u/174s/5bdb5d4c53504627c62f9e30f48e9063.png","size":"large"},{"#text":"http://img2-ak.lst.fm/i/u/300x300/5bdb5d4c53504627c62f9e30f48e9063.png","size":"extralarge"},{"#text":"http://img2-ak.lst.fm/i/u/5bdb5d4c53504627c62f9e30f48e9063.png","size":"mega"}]},{"name":"Justin Bieber","playcount":"38467206","listeners":"2496872","mbid":"e0140a67-e4d1-4f13-8a01-364355bee46e","url":"http://www.last.fm/music/Justin+Bieber","streamable":"0","image":[{"#text":"http://img2-ak.lst.fm/i/u/34s/4232e1f81e5b42f8c26ffb2c0fea6b87.png","size":"small"},{"#text":"http://img2-ak.lst.fm/i/u/64s/4232e1f81e5b42f8c26ffb2c0fea6b87.png","size":"medium"},{"#text":"http://img2-ak.lst.fm/i/u/174s/4232e1f81e5b42f8c26ffb2c0fea6b87.png","size":"large"},{"#text":"http://img2-ak.lst.fm/i/u/300x300/4232e1f81e5b42f8c26ffb2c0fea6b87.png","size":"extralarge"},{"#text":"http://img2-ak.lst.fm/i/u/4232e1f81e5b42f8c26ffb2c0fea6b87.png","size":"mega"}]},{"name":"The Beatles","playcount":"457325759","listeners":"4070584","mbid":"b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d","url":"http://www.last.fm/music/The+Beatles","streamable":"0","image":[{"#text":"http://img2-ak.lst.fm/i/u/34s/e06ad133f88c446484457687cd21af6a.png","size":"small"},{"#text":"http://img2-ak.lst.fm/i/u/64s/e06ad133f88c446484457687cd21af6a.png","size":"medium"},{"#text":"http://img2-ak.lst.fm/i/u/174s/e06ad133f88c446484457687cd21af6a.png","size":"large"},{"#text":"http://img2-ak.lst.fm/i/u/300x300/e06ad133f88c446484457687cd21af6a.png","size":"extralarge"},{"#text":"http://img2-ak.lst.fm/i/u/e06ad133f88c446484457687cd21af6a.png","size":"mega"}]},{"name":"Adele","playcount":"108473240","listeners":"3811459","mbid":"cc2c9c3c-b7bc-4b8b-84d8-4fbd8779e493","url":"http://www.last.fm/music/Adele","streamable":"0","image":[{"#text":"http://img2-ak.lst.fm/i/u/34s/40eb2347b4c9149f38ebbcff70c648bb.png","size":"small"},{"#text":"http://img2-ak.lst.fm/i/u/64s/40eb2347b4c9149f38ebbcff70c648bb.png","size":"medium"},{"#text":"http://img2-ak.lst.fm/i/u/174s/40eb2347b4c9149f38ebbcff70c648bb.png","size":"large"},{"#text":"http://img2-ak.lst.fm/i/u/300x300/40eb2347b4c9149f38ebbcff70c648bb.png","size":"extralarge"},{"#text":"http://img2-ak.lst.fm/i/u/40eb2347b4c9149f38ebbcff70c648bb.png","size":"mega"}]}],"@attr":{"page":"1","perPage":"50","totalPages":"507295","total":"25364750"}}}');

            }));


            afterEach(function() {
                _$httpBackend.verifyNoOutstandingExpectation();
                _$httpBackend.verifyNoOutstandingRequest();
            });

            describe('getTopArtists', ()=> {

                it('should call the right url', () => {
                    _lastFmService.getTopArtists();
                    _$httpBackend.expectGET(topArtistsUrl);
                    _$httpBackend.flush();
                });


                it('should return a promise of a list of artists', ()=> {
                    _lastFmService.getTopArtists().then(
                        (artists : LastFMDataVis.Data.Artist[])=>{
                            //artists will vary over time - just need to check they are there and have the right properties
                            expect(artists.length).toBeGreaterThan(4);
                            expect(artists[0].name).toBeTruthy();
                            expect(artists[0].mbid).toBeTruthy();
                        },
                        (error) =>{fail(error);}
                    );
                    //$httpBackend makes these calls synchronous, so done() is unnecessary and can cause digest conflicts
                    _$httpBackend.flush();
                });

            });

        });

    });

});