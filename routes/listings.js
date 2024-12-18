const express = require("express");
const router = new express.Router();
const { ExpressError, wrapAsync } = require("../utilities.js");
const listingsController = require("../controller/listings.js");
const { isLoggedIn, isBusiness } = require("../middlewares.js");

router.route("/")
  .get(listingsController.getListings)
  .post(isLoggedIn, isBusiness,  wrapAsync(listingsController.postListings));

// router.get("/search", wrapAsync(listingsController.getListingsBySearch));

// router.get("/for/:forWho", wrapAsync(listingsController.getListingsFor));

// router.get("/new", isLoggedIn, (listingsController.getNewListingForm));

// router.route("/:id")
//   .get(wrapAsync(listingsController.getListingShowPage))
//   .put(isLoggedIn, ensureListingOwner,upload.single("listing[image]"), wrapAsync(listingsController.updateListing))
//   .delete(isLoggedIn, ensureListingOwner, (listingsController.deleteListing));


// router.get("/:id/edit", saveCurrentUrl, isLoggedIn, ensureListingOwner, wrapAsync(listingsController.getListingEditForm));

module.exports = router;
