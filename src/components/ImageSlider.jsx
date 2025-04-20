// Api/Url -> https://picsum.photos/v2/list?page=1&limit=10

import React, { useEffect, useState } from 'react'

import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import './style.css'

const ImageSlider = ({ url, page, limit }) => {

    const [images, setImages] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0)
    const [errorMsg, setErrorMsg] = useState(null)
    const [loading, setLoading] = useState(false)


    const fetchImages = async (getUrl) => {

        try {

            setLoading(true)
            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();

            if (data) {
                setImages(data);
                setLoading(false);
            }
        }
        catch (e) {

            setErrorMsg(e.message);
            setLoading(false);
        }

    }


    function handlePrevious() {

        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
    }


    function handleNext() {
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1)
    }
    

    useEffect(() => {

        if (url !== '') {
            fetchImages(url)
        }
    }, [url])

    console.log(images)

    if (loading) {
        return (
            <div>
                Loading data! Please wait
            </div>
        )
    }

    if (errorMsg !== null) {
        return (
            <div>
                Error occured! {errorMsg}
            </div>
        )
    }


    return (
        <div className='container'>
            <BsArrowLeftCircleFill
                onClick={handlePrevious}
                className='arrow arrow-left' />
            {
                images.length > 0    // images {? : }
                    ? images.map((currentImage, index) => (
                        <img
                            key={currentImage.id}  // key={index} you can put any two of them.
                            src={currentImage.download_url}
                            alt={currentImage.download_url}
                            className={
                                currentSlide === index 
                                ? 'current-img'
                                : 'current-img hide'
                                } />
                    ))
                    : null
            }

            <BsArrowRightCircleFill
                onClick={handleNext}
                className='arrow arrow-right' />

            <span className='circle-indicators'>
                {
                    images.length > 0
                        ? images.map((_, index) => (
                            <button
                                key={index}
                                className={
                                    currentSlide === index
                                    ? 'current-indicator'
                                    : 'current-indicator inactive'}
                                    
                                onClick = {() => setCurrentSlide(index)}>

                            </button>
                        ))
                        : null
                }
            </span>
        </div>
    )
}

export default ImageSlider