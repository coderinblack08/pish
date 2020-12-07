import firebase from 'firebase';
import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    zIndex: '9999',
    backgroundColor: '#00000088',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '24rem',
    borderRadius: '0.5rem',
    minHeight: '12rem',
    width: '100%',
    margin: '0 4rem',
  },
};

export const SettingsModal: React.FC<{ chat: any; id: string }> = ({
  chat,
  id,
}) => {
  const firestore = firebase.firestore();
  const chatRef = firestore.collection('chats').doc(id);
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles as any}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Settings Modal"
      >
        <div className="flex justify-between text-red-500">
          <h2 className="font-bold text-lg">Settings</h2>
          <button onClick={() => setIsOpen(false)}>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="mt-2">
          <form>
            <div className="flex items-center justify-between">
              <h3 className="font-bold mb-1">Moderators</h3>
              <button>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
              </button>
            </div>
            <input
              type="text"
              placeholder="Email or Username"
              className="w-full px-3 py-2 focus:outline-none focus:border-none focus:border-white focus:ring-2 focus:ring-red-600 rounded my-2 shadow-sm border cursor-not-allowed"
              disabled
            />
          </form>
          <div className="mb-4">
            {chat?.moderators?.map((uid: string) => (
              <div className="text-gray-600 w-full text-left" key={uid}>
                {uid}
              </div>
            ))}
          </div>

          <h3 className="font-bold mb-1">Banned</h3>
          {chat?.banned?.map((uid: string) => (
            <button
              key={uid}
              className="flex items-center text-gray-600"
              onClick={() => {
                chatRef.update({
                  banned: firebase.firestore.FieldValue.arrayRemove(uid),
                });
              }}
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              {uid}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};
