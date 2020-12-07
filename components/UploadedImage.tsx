import firebase from 'firebase';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export const UploadedImage: React.FC<{ message: any }> = ({ message }) => {
  const auth = firebase.auth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [user] = useAuthState(auth);
  const isMe = (message: any) => message.uid === user.uid;

  useEffect(() => {
    if (imageRef.current?.complete) {
      setLoading(false);
    }
  }, [imageRef]);

  return (
    <>
      <img
        className={`${loading ? 'hidden' : 'block'} ${
          error ? 'hidden' : 'block'
        } max-w-md object-cover rounded-xl p-1.5 ${
          isMe(message) ? 'bg-lightBlue-600' : 'bg-red-600'
        } text-white`}
        src={message.imageURL}
        ref={imageRef}
        onError={() => setError(true)}
        onLoad={() => {
          setLoading(false);
        }}
        alt="Uploaded file"
      />
      <div
        className={`${
          loading
            ? 'flex items-center justify-center'
            : error
            ? 'flex items-center justify-center py-16 px-24'
            : 'hidden py-2.5 px-4'
        } max-w-md object-cover rounded-xl ${
          isMe(message) ? 'bg-lightBlue-600' : 'bg-red-600'
        } text-white`}
        style={
          !error
            ? {
                width: imageRef.current?.width,
                height: imageRef.current?.height,
              }
            : {}
        }
      >
        {error ? (
          <svg
            className="mt-1 h-8 w-8 text-white text-opacity-75 animate-pulse"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="animate-spin mt-1 h-8 w-8 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </div>
    </>
  );
};
