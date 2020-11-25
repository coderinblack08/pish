import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Navbar } from '../components/Navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import ReactTooltip from 'react-tooltip';

const Discuss: React.FC = () => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const chatRef = firestore.collection('chats');
  const chatQuery = chatRef.orderBy('official').limit(25);

  const [user] = useAuthState(auth);
  const [chats] = useCollectionDataOnce(chatQuery, { idField: 'id' });

  return (
    <div className="text-gray-50 bg-gray-800 min-h-screen">
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <svg
            className="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
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
        </div>
      ) : user ? (
        <div className="container mx-auto pt-10 px-5">
          <div className="flex justify-between">
            <div>
              <h1
                data-tip="Official and community driven"
                className="flex items-center font-bold text-2xl"
              >
                Live chats
              </h1>
              <ReactTooltip place="bottom" type="dark" effect="solid" />
            </div>
            <div className="space-x-2">
              <Button href="/create" sans>
                Create
              </Button>
              <Button
                onClick={() => auth.signOut()}
                colorTheme="lightBlue"
                sans
              >
                Sign out
              </Button>
            </div>
          </div>
          <br />
          <div className="flex items-center space-x-4">
            {chats?.map((chat: any) => (
              <div
                className="rounded-md bg-gray-700 border border-gray-600 p-5 max-w-sm w-full"
                key={chat.id}
              >
                <h2 className="text-xl font-bold flex items-center">
                  {chat.name}
                  <svg
                    className="w-5 h-5 text-red-500 ml-2.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                  </svg>
                  {chat.official ? (
                    <svg
                      className="w-5 h-5 text-lightBlue-500 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : null}
                </h2>
                <p
                  className="mt-2.5 text-gray-400"
                  style={{ fontSize: '1.075rem' }}
                >
                  {chat.description}
                </p>
                <div className="mt-5">
                  <Button href={`/chatroom/${chat.id}`}>
                    <div className="px-4">Join</div>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-36 lg:py-40 px-5 lg:px-0 md:px-10 mx-auto max-w-prose space-y-3">
          <h1 className="font-serif font-bold text-4xl">
            Discuss with the community
          </h1>
          <p className="text-lg">
            Please begin by choosing a{' '}
            <span className="font-bold">social account provider</span>
          </p>
          <div className="pt-3">
            <Button
              onClick={() => {
                const provider = new firebase.auth.GoogleAuthProvider();
                auth.signInWithPopup(provider);
              }}
              sans
            >
              Continue with Google
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discuss;
