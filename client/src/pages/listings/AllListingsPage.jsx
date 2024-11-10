import { useEffect, useState } from "react"
import { getAllListings } from "../../api/listingApi.js";
import ListingCard from "../../components/Listing/ListingCard.jsx";
import { toast } from "react-toastify";

const AllListingsPage = () => {
    const [listings, setListings] = useState([]);

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    useEffect(() => {
        (async function () {
            setLoading(true);
            try {
                setLoading(true);
                let response = await getAllListings();
                setLoading(false);
                if (response && response.status == 200) {
                    setListings(response.data.listings);
                    return;
                } 
                if(response == undefined){
                    setError("We use Render FREE service for backend serve and it takes upto 1-2 mins to start...");
                    toast.error("We use Render FREE service for backend serve and it takes upto 1-2 mins to start...");
                    return;
                }
                toast.warning(response.data.message);
            } catch (error) {
                const { message = "We use Render FREE service for backend serve and it takes upto 1-2 mins to start..."} = error;
                toast.error(message);
                setError(message);
            }
        })()
    }, [])

    useEffect(() => {
        document.title = "All Listings | RoamStay";
    }, [])


    return (
        <div>
            <h1 className="text-center font-semibold text-2xl py-4 pb-5 underline underline-offset-8 text-gray-800">All Listings</h1>
            <div className="flex gap-3 flex-wrap justify-center">
                {
                    error != null &&
                    <p>{error}</p>
                }
                {
                    loading &&
                    <p>Loading...</p>
                }
                
                {
                    listings.length > 0 && listings.map((listing) => {
                        return <ListingCard key={listing._id} listing={listing} />
                    }) 
                }
            </div>
        </div>
    )
}

export default AllListingsPage;