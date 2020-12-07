import firebase from 'firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import ReactTooltip from 'react-tooltip';
import { Button } from '../components/Button';
import { Navbar } from '../components/Navbar';

const Discuss: React.FC = () => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const chatRef = firestore.collection('chats');
  const chatQuery = chatRef.orderBy('official', 'desc').limit(25);

  const [user] = useAuthState(auth);
  const [chats, loading] = useCollectionDataOnce(chatQuery, { idField: 'id' });

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
            <div className="flex items-center space-x-3">
              <div>
                <h1
                  data-tip="Official and community driven"
                  className="flex items-center font-bold text-2xl"
                >
                  Live chats
                </h1>
                <ReactTooltip place="bottom" type="dark" effect="solid" />
              </div>
              <div className="rounded-full px-2.5 py-0.5 bg-red-600 text-sm font-bold font-mono">
                BETA
              </div>
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
          <div className="flex flex-wrap items-start -mt-2">
            {chats?.map((chat: any, index) => (
              <div
                className={`rounded-md bg-gray-700 border border-gray-600 p-3 max-w-sm w-full mr-4 mb-4`}
                key={chat.id}
              >
                <div className="px-2 py-2">
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
                </div>
                <div className="mt-5">
                  <Button href={`/chatroom/${chat.id}`} className="w-full" sans>
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
              onClick={async () => {
                const provider = new firebase.auth.GoogleAuthProvider();
                const task = await auth.signInWithPopup(provider);
                if (task.additionalUserInfo?.isNewUser) {
                  firestore.collection('users').doc(task.user?.uid).set({
                    chats: [],
                  });
                }
              }}
              sans
            >
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  role="img"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Continue with Google
              </div>
            </Button>
            <div className="inline p-2" />
            <Button
              onClick={async () => {
                const provider = new firebase.auth.GithubAuthProvider();
                const task = await auth.signInWithPopup(provider);
                if (task.additionalUserInfo?.isNewUser) {
                  firestore.collection('users').doc(task.user?.uid).set({
                    chats: [],
                  });
                }
              }}
              colorTheme="gray"
              sans
            >
              <div className="flex items-center">
                <svg
                  role="img"
                  aria-hidden="true"
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  ></path>
                </svg>
                Continue with Github
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discuss;
