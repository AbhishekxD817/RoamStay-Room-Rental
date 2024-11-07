import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showListing } from "../../api/listingApi.js";

import { Card, CardBody, CardHeader, CardFooter, CardProvider } from "@nextui-org/card";
import { DollarSign, IndianRupee, MapPin } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

const ShowListingPage = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [listing, setListing] = useState();

    useEffect(() => {
        document.title = listing ? listing.title : "Error";
    }, [listing])

    useEffect(() => {
        (async function () {
            const response = await showListing(id);
            if (response.status != 200) {
                console.log(response);
                setError(response);
                return;
            }
            setListing(response.data.listing);
        })()
    }, [])


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

                    </section>

                </div>
            }
        </>
    )
}

export default ShowListingPage;