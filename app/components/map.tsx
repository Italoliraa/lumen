"use client"

import { useEffect, useRef } from "react"

interface MapProps {
  center?: { lat: number; lng: number }
  zoom?: number
  markers?: Array<{ lat: number; lng: number; title?: string }>
  className?: string
}

export default function Map({
  center = { lat: -8.0476, lng: -34.877 }, // Default to Recife
  zoom = 14,
  markers = [],
  className = "w-full h-full",
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      // Define the callback function
      window.initMap = () => {
        if (mapRef.current && !mapInstanceRef.current) {
          const mapOptions = {
            center,
            zoom,
            disableDefaultUI: true,
            styles: [
              {
                elementType: "geometry",
                stylers: [{ color: "#242f3e" }],
              },
              {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#242f3e" }],
              },
              {
                elementType: "labels.text.fill",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
              },
              {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
              },
            ],
          }

          mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions)

          // Add markers
          markers.forEach((marker) => {
            new google.maps.Marker({
              position: { lat: marker.lat, lng: marker.lng },
              map: mapInstanceRef.current,
              title: marker.title,
            })
          })
        }
      }
    }

    // Check if Google Maps is already loaded
    if (typeof google === "undefined") {
      loadGoogleMapsScript()
    } else {
      // If already loaded, just initialize the map
      if (mapRef.current && !mapInstanceRef.current) {
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          disableDefaultUI: true,
        })

        // Add markers
        markers.forEach((marker) => {
          new google.maps.Marker({
            position: { lat: marker.lat, lng: marker.lng },
            map: mapInstanceRef.current,
            title: marker.title,
          })
        })
      }
    }

    // Cleanup
    return () => {
      // Remove the global callback when component unmounts
      if (window.initMap) {
        delete window.initMap
      }
    }
  }, [center, zoom, markers])

  return <div ref={mapRef} className={className}></div>
}

// Add this to make TypeScript happy with the global initMap function
declare global {
  interface Window {
    initMap: () => void
  }
  var google: any
}
