import { useEffect, useState } from "react"
import { getAllListings } from "../../api/listingApi.js";
import ListingCard from "../../components/Listing/ListingCard.jsx";

const AllListingsPage = () => {
    const [listings, setListings] = useState([]);


    useEffect(() => {
        document.title = "All Listings";
    }, [])

    useEffect(() => {
        (async function () {
            let response = await getAllListings();
            if (response.status != 200) {
                return;
            } else {
                setListings(response.data.listings);
            }
        })()
    }, [])

    return (
        <div>
            <h1 className="text-center font-semibold text-2xl py-4 pb-5 underline underline-offset-8 text-gray-800">All Listings</h1>
            <div className="flex gap-3 flex-wrap justify-center">
                {
                    listings.length ? listings.map((listing) => {
                        return <ListingCard key={listing._id} listing={listing} />
                    }) : <h1>No listings</h1>
                }
            </div>
        </div>
    )
}

export default AllListingsPage;