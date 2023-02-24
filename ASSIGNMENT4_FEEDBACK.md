Hi Max!

Wow, perfect! Looks and works great on all devices.

A have a few very minor code style comments down below, and the only other thing I noticed is that sometimes the return has "null" for the preview_url. Always a good idea to do a quick if test to make sure there's a value bfore using it.

10/10, Välgodkänt! Very well done.



*************************************

CRITERIA FOR GRADING

*************************************

GODKÄNT:
-------------------------------------

Connect to an API ✅

User fired event to launch the fetch ✅

Data is returned and handled efficiently ✅

Display more than one property of the returned data ✅

RWD
  Desktop ✅
  Mobile ✅

-------------------------------------

VÄLGODKÄNT:
-------------------------------------

Error handling when fetching the data ✅

Append arguments to the request ✅

Multiple calls to the API ✅

Code style ✅
  Great job with artistFollowersFunction(), really smart. Ideally it should be declared outside of the getSpotifyArtists(). Beacuse it is inside the getSpotifyArtists function it isn't available anywhere else.

  Always add an alt attribute on an img tag