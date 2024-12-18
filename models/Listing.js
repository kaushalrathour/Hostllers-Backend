const mongoose = require("mongoose");
const Review = require("./Review");
const Schema =  mongoose.Schema;
const model = mongoose.model;

const listingSchema = new Schema ({
    title: String,
    forWho: {
        boys: {
            type: Boolean,
            default: false,
        },
        girls: {
            type: Boolean,
            default: false,
        },
        both: {
            type: Boolean,
            default: false,
        },
    },
    city: String,
    state: String,
    address: String,
    price: Number,
    image: { path: String,
        filename: {
            type: String,
            default: "DefaultFileName"
        },
    },
    description: String,
    bedrooms: Number,
    nearCollege: {
        type: Boolean,
        default: false,
    },
    collegeName: {
        type: String,
        required: function () {
            return this.nearCollege;
        }
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    roomType: {
        single: {
            type: Boolean,
            default: false,
        },
        double: {
            type: Boolean,
            default: false,
        },
        triple: {
            type: Boolean,
            default: false
        },
        dormitory: {
            type: Boolean,
            default: false,
        }
    },
    facilities: {
        WiFi: {
            type: Boolean,
            default: false
        },
        Parking: {
            type: Boolean,
            default: false
        },
        Gym: {
            type: Boolean,
            default: false
        },
        Laundry: {
            type: Boolean,
            default: false
        },
        AC: {
            type: Boolean,
            default: false
        },
        Heating: {
            type: Boolean,
            default: false
        },
        Kitchen: {
            type: Boolean,
            default: false
        },
        TV: {
            type: Boolean,
            default: false
        },
        Mess: {
            type: Boolean,
            default: false
        },
        Washroom: {
            type: Boolean,
            default: false
        },
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    views: {
        type:Number,
        default: 0,
    },
    mobile: {
        type: Number,
    },
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'Invalid email address'],
    },
    
})



listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
        console.log("Post Trigerred");
    }
    
})
module.exports = model("Listing", listingSchema);