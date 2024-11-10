import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showListing } from "../../api/listingApi.js";
import { useForm } from 'react-hook-form';

import { Card, CardBody, CardHeader, CardFooter, CardProvider } from "@nextui-org/card";
import { Delete, DollarSign, Edit, IndianRupee, MapPin, Send, Star, Trash } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { createReview, deleteReview, updateReview } from "../../api/reviewApi.js";
import ReviewCard from "../../components/review card/ReviewCard.jsx";

const ShowListingPage = () => {

    
    
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [listing, setListing] = useState();
    
    async function fetchListing() {
        const response = await showListing(id);
        if (response.status != 200) {
            console.log(response);
            setError(response);
            return;
        }
        setListing(response.data.listing);
    }
    
    
    useEffect(() => {
        (async function () {
            await fetchListing();
        })()
    }, [])
    
    
    
    // handle reviews(
        const { register, handleSubmit, reset } = useForm();
        
        const handleReviewFormSubmit = async (data) => {
            try {
                let response = await createReview(listing._id, data);
                if (response.status == 200) {
                await fetchListing();
                reset();
                return;
            }
            console.log(response);
        } catch (error) {
            const { message = "Error"} = error;
            toast.error(message);
            return;        }
        }
        
        
        
        
        // title change
        useEffect(() => {
            document.title = listing ? `${listing.title} | RoamStay` : "Error";
        }, [listing])
        
        return (
            <>
            {error != null && <h1>Error</h1>
            }
            {listing &&
                <div className="flex-grow container mx-auto px-4 py-8">
                    <Card className="w-full">
                        <CardBody>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className=" flex justify-center items-center w-full h-96 overflow-hidden object-contain">
                                    <img
                                        alt={listing.title}
                                        className="object-cover w-full h-full rounded-xl"
                                        src={listing.image}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <h1 className="text-2xl font-bold">{listing.title}</h1>
                                    <p className="text-gray-600">{listing.description}</p>
                                    <div className="flex items-center space-x-2 text-gray-500">
                                        <MapPin size={18} />
                                        <span>{listing.location}, {listing.country}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-green-600 font-semibold">
                                        <DollarSign size={18} />
                                        <span>{listing.price.toFixed(2)} per night</span>
                                    </div>
                                    <Button color="primary" size="lg">
                                        Book Now
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter className="mt-12 flex flex-col items-start">
                            <h2 className="text-xl font-semibold mb-4">About this listing</h2>
                            <p className="text-gray-600">
                                Experience the charm of countryside living in this delightful cottage. Nestled in the picturesque town of Haverfordwest, UK, this cozy retreat offers a perfect blend of rustic appeal and modern comfort. Ideal for couples or small families looking for a peaceful getaway, our cottage provides a unique opportunity to immerse yourself in the tranquil beauty of rural life.
                            </p>
                        </CardFooter>
                    </Card>

                    <section className="mt-12">
                        <div className="mx-auto p-4">
                        <h2 className="text-2xl font-bold mb-4">Drop a review</h2>

                            <form onSubmit={handleSubmit(handleReviewFormSubmit)} className="mb-8 border border-slate-300 rounded-lg p-2 shadow-md shadow-slate-300" >
                                <div className="mb-4">
                                    <textarea
                                        className="w-full bg-slate-50 border-1 p-2"
                                        label="Your Review"
                                        placeholder="Write your review here..."
                                        rows={3}
                                        {...register('content')}
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="number"
                                        label="Rating"
                                        min={1}
                                        max={5}
                                        placeholder="rating 1-5"
                                        {...register('ratings')}
                                        className="w-full bg-slate-50 border-1 p-2"
                                    />
                                </div>
                                <div className="py-2">

                                    <Button
                                        color="secondary"
                                        type="submit"
                                        endContent={<Send className="w-4 h-4" />}
                                    >
                                        Submit Review
                                    </Button>
                                </div>
                            </form>


                            {/* list */}
                            <h3 className="text-xl font-bold mb-4">No. of Reviews - {listing.reviews.length}</h3>

                            <div className="space-y-4">
                                {listing.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} lid={listing._id} fetchListing={fetchListing} />
                                ))}
                            </div>
                        </div>
                    </section>

                </div>
            }
        </>
    )
}

export default ShowListingPage;