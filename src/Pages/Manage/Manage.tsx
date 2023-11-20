import Container from '@src/components/Container';
import { useGetUser } from '@src/hooks/useGetUser';
import { useState } from 'react';
import WordGroupForm from '@src/components/WordGroupForm';

function Manage() {
  const { user, userLoading } = useGetUser();
  const [showModal, setShowModal] = useState(false);
  console.log('user-------->', user);
  return (
    <Container>
      <div className="flex justify-center items-start w-full">
        <div className="flex-center flex-col w-full">
          <h3 className="text-xl mb-6">My Word Groups</h3>
          {userLoading && (
            <div className="card">
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-36" />
              </div>
            </div>
          )}
          {user?.wordGroups?.map((wordGroup) => {
            return (
              <button key={wordGroup} className="card-btn">
                <p className="text-lg">{wordGroup}</p>
              </button>
            );
          })}
        </div>
        <div className="flex justify-center items-center flex-col w-full h-full align-top">
          <h3 className="text-xl mb-6">Quick actions</h3>
          <button
            onClick={() => setShowModal(true)}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-800 rounded-md">
              + Add word group
            </span>
          </button>
          {showModal && <WordGroupForm onClose={() => setShowModal(false)} />}
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-800 hover:text-white rounded-md group-hover:bg-opacity-0">
              + Add word
            </span>
          </button>
        </div>
      </div>
      {/*{showModal && (*/}
      {/*  <WordGroupModal*/}
      {/*    showModal={showModal}*/}
      {/*    onClose={() => {*/}
      {/*      setShowModal(false);*/}
      {/*    }}*/}
      {/*    onSave={() => {*/}
      {/*      setShowModal(false);*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
    </Container>
  );
}

export default Manage;
