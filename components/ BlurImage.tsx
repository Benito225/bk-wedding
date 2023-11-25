"use client"

import React, { useEffect, useState } from 'react';
import styles from './BlurImage.module.css';
import NextImage from "next/image";

interface BlurImageProps {
    imageUrl: string;
    alt: string;
}

const BlurCoverImage: React.FC<BlurImageProps> = ({ imageUrl, alt }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = imageUrl;

        image.onload = () => {
            setLoaded(true);
        };
    }, [imageUrl]);

    return (
        <div className={`${styles.blurContainer} ${loaded ? styles.loaded : ''}`}>
            {alt == "cover-mobile" ? <NextImage src={imageUrl} alt={alt} className={`${styles.blurImage} object-cover object-top z-[-1] block lg:hidden`} fill />
                : <NextImage src={imageUrl} alt={alt} className={`${styles.blurImage} object-cover object-right z-[-1] hidden lg:block`} fill />}
        </div>
    );
};

export default BlurCoverImage;
