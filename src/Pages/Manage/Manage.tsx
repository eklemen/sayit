import Container from '@src/components/Container';
import { useGetUser } from '@src/hooks/useGetUser';

function Manage() {
  const { user } = useGetUser();
  console.log('user-------->', user);
  return (
    <Container>
      <div className="flex-center w-full">
        <div className="flex-center flex-col w-full">
          <h3 className="text-xl mb-6">My Word Groups</h3>
          {user?.wordGroups.map((wordGroup) => {
            return <div className="card">{wordGroup}</div>;
          })}
        </div>
        <div className="flex-center w-full">
          <h3 className="text-xl">quick actions</h3>
        </div>
      </div>
    </Container>
  );
}
export default Manage;
