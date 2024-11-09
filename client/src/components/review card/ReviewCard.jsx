
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showListing } from "../../api/listingApi.js";
import { useForm } from 'react-hook-form';

import { Card, CardBody, CardHeader, CardFooter, CardProvider } from "@nextui-org/card";
import { Delete, DollarSign, Edit, IndianRupee, MapPin, Send, Star, Trash } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { createReview, deleteReview, updateReview } from "../../api/reviewApi.js";




const ReviewCard = ({ review, lid , fetchListing}) => {

    const formatter = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString('en-US', options)
    };

    const { register, handleSubmit, reset } = useForm();
    const [isEditing, setIsEditing] = useState(false);

    const handleReviewUpdateForm = async (data) => {
        try {
            let response = await updateReview(lid,review._id,data);
            if(response.status == 200){
                setIsEditing(!isEditing);
                await fetchListing();
                return;
            }
        } catch (error) {
            console.log("ERror => ", error);
        }
    }

    const handleReviewDeleteButton = async (rid) => {
        try {
            let response = await deleteReview(lid, rid);
            if (response.status == 200) {
                await fetchListing();
                return;
            }
            return;
        } catch (error) {
            console.log("Error =>", error);
        }
    }


    return (
        <Card key={review._id}
            className="mb-8 border bg-slate-100 border-slate-300 rounded-lg p-2 shadow-md shadow-slate-300" >
            <CardBody>
                <div className="flex justify-between gap-2">
                    {isEditing ?
                        <>
                            <form onSubmit={handleSubmit(handleReviewUpdateForm)} className="mb-8 border border-slate-300 rounded-lg p-2 shadow-md shadow-slate-300 w-full" >
                                <div className="mb-4">
                                    <textarea
                                        className="w-full bg-slate-50 border-1 p-2"
                                        label="Your Review"
                                        rows={3}
                                        placeholder={review.content}
                                        {...register('content')}
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="number"
                                        label="Rating"
                                        min={1}
                                        max={5}
                                        placeholder={review.ratings}
                                        {...register('ratings')}
                                        className="w-full bg-slate-50 border-1 p-2"
                                    />
                                </div>
                                <div className="py-2">

                                    <Button
                                        color="primary"
                                        type="submit"
                                        endContent={<Send className="w-4 h-4" />}
                                    >
                                        Update Review
                                    </Button>
                                </div>
                            </form>
                        </>
                        :
                        <p className="mb-2">{review.content}</p>
                    }
                    <div className="flex gap-1">
                        <Button isIconOnly onClick={(e) => { setIsEditing(() => !isEditing) }} className="bg-green-300"><Edit size={16} /></Button>
                        <Button onClick={(e) => {
                            handleReviewDeleteButton(review._id);
                        }} isIconOnly className="bg-red-300"><Trash size={16} /></Button>
                    </div>
                </div>
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-slate-800'}`}
                            fill={i < review.ratings ? '#FFFF00' : 'none'}
                        />
                    ))}
                </div>
            </CardBody>
            <CardFooter>
                <p className="text-small text-default-500">
                    By {review.owner.name} on {formatter(review.createdAt)}
                </p>
            </CardFooter>
        </Card>

    )
}

export default ReviewCard;