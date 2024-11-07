import { Image } from "@nextui-org/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/button";
import { IoOpenOutline } from "react-icons/io5";
import { HeartIcon } from "lucide-react";



const ListingCard = ({ listing }) => {
    return (
        <Link to={listing._id}>
            <Card className="max-w-xs border-1 min-w-[320px]">
                <CardHeader className="p-0">
                    <img
                        src={listing.image}
                        alt={listing.title}
                        width={300}
                        className="w-full h-48 object-cover"
                    />
                    <Button
                        isIconOnly
                        color="danger"
                        aria-label="Like"
                        className="absolute top-2 right-2 z-10 bg-white bg-opacity-50 hover:bg-opacity-100"
                    >
                        <HeartIcon className="w-5 h-5" />
                    </Button>
                </CardHeader>
                <CardBody className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
                    <p className="text-sm text-gray-600 mb-2">{listing.description}</p>
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Location:</span> {listing.location}, {listing.country}
                    </p>
                    <p className="text-lg font-bold text-primary mt-2">
                        ${listing.price} / <span className="text-sm font-normal">per night</span>
                    </p>
                </CardBody>
                <CardFooter className="p-4 pt-0">
                    <Button color="primary" className="w-full" >
                        View Listing
                        <IoOpenOutline />
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}

export default ListingCard;