$(function() {
    const API_ADDRESS = "https://spotify-api-wrapper.appspot.com";
    
    $("button").on("click", getSpotifyArtists);
    let audioPlayers = []; 
    
    function getSpotifyArtists() {
     let artistQuery = $(".search").val();
  
     fetch(API_ADDRESS + "/artist/" + artistQuery)
        .then((response) => {
            if (!response.ok) {
                throw new Error (response.status)
            } else {
                return response.json()
            }
        })
        .then(data => {
            $(".error-message").hide();
            
            let artist = data.artists.items[0];
            $(".name-artist").text(artist.name);
            $(".img-artist").attr("src", artist.images[0].url);
            $(".top-songs-by-artist").text("Top songs by artist");
            
            let artistFollowers = artist.followers.total;
            let artistFollowersArray = String(artistFollowers).split("").map((artistFollowers) => {
                return Number(artistFollowers)
            })

            if (artistFollowersArray.length === 4) {
                artistFollowersFunction(1);
            } else if (artistFollowersArray.length === 5) {
                artistFollowersFunction(2);
            } else if (artistFollowersArray.length === 6) {
                artistFollowersFunction(3);
            } else if (artistFollowersArray.length === 7) {
                artistFollowersFunction(1);
                artistFollowersFunction(5);
            } else if (artistFollowersArray.length === 8) {
                artistFollowersFunction(2);
                artistFollowersFunction(6);
            }

            let artistFollowersSpliced = artistFollowersArray.join("");
            $(".followers-artist").text("Followers: " + artistFollowersSpliced);

            function artistFollowersFunction(index, remove = 0, item = " ") {
                artistFollowersArray.splice(index, remove, item);
            }

            $(".genres-artist").empty();
            $(".genres-artist").prepend("<h3>Genres: </h3>");
            $(".genres-artist").append("<div class='genre-container'></div>");
            artist.genres.forEach(function(genre) {
                $("<div class='genre'>").text(genre).appendTo($(".genre-container"));
            });
            
            $(".intro-message").hide();
            let tracksEndpoint = API_ADDRESS + "/artist/" + artist.id + "/top-tracks";
  
            fetch(tracksEndpoint)
            .then((response) => {
                if (!response.ok) {
                    throw new Error (response.status)
                } else {
                    return response.json()
                }
            })
            .then(data => { 
                $(".tracks-by-artist").empty();
                data.tracks.forEach(function(track) {
                    console.log(track);
                    let audio = new Audio(track.preview_url);
                        audio.setAttribute("controls", true);

                    audio.volume = .1;
                    audioPlayers.push(audio);

                    let playTriggerdByProgram = false;
                    audio.onplay = function() {
                        if (playTriggerdByProgram) {
                            playTriggerdByProgram = false;
                            return;
                        }

                        audioPlayers.forEach(function(player) {
                            player.pause();
                        });

                        playTriggerdByProgram = true;
                        this.play();
                        $("audio").removeAttr('style');
                        $(this).css({"background-color" : "#90ee90", "border" : "3px solid #90ee90", "border-radius" : "37px"});
                    };

                    if (track.preview_url === null) {
                        $(".tracks-by-artist").text("Could not find all songs. Try a different artist");
                    } else {
                        let trackDiv = $("<div class='artist-track'>").text(track.name).appendTo($(".tracks-by-artist"));
                        $(audio).appendTo(trackDiv);
                    }
                    $(".content").removeClass("display-flex");
                    $(".content").addClass("display-flex");
                })
            })
        })
        .catch(error => {
        $(".content, .intro-message").hide();
        $("main").append("<div class='error-message'></div>");
        $(".error-message").text("Something went wrong: " + error);
        });
    }
});