import React, { useEffect, useRef } from 'react';


const Ads = ({
    adSlot,
    adClient = 'ca-pub-3993321950885538', // default to the client id you already included in index.html
    adFormat = 'auto',
    fullWidthResponsive = true,
    style = { display: 'block', textAlign: 'center', minHeight: '50px' },
    className = '',
    test = false,
}) => {
    const insRef = useRef(null);


    useEffect(() => {
        if (typeof window === 'undefined') return; // server-side safety


        if (!adSlot) {
            console.warn('Ads.jsx: missing adSlot prop — your ad will not render.');
            return;
        }


        const pushAd = () => {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.warn('Ads.jsx: adsbygoogle push failed', err);
            }
        };


        // If the main adsbygoogle script isn't present (index.html should already have it), load it once.
        if (!window.adsbygoogle) {
            const script = document.createElement('script');
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
            script.async = true;
            document.head.appendChild(script);
            script.onload = pushAd;
            script.onerror = () => console.warn('Ads.jsx: failed to load adsbygoogle script');
        } else {
            // script already loaded — just push for this ad slot
            pushAd();
        }
    }, [adSlot]); // re-run if adSlot changes


    return (
        <ins
            className={`adsbygoogle ${className}`}
            style={style}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
            data-adtest={test ? 'on' : undefined}
            ref={insRef}
        />
    );
};


export default Ads;
