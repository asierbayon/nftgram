import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthStore';
import { useHistory, useParams } from 'react-router';
import usersService from '../services/users-service';
import UserForm from '../components/users/UserForm';


function EditProfile() {

  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const params = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchUser() {
      const user = await usersService.user(currentUser.username);
      if (!isUnmounted) {
        setUser(user.user);
      }
    }

    let isUnmounted = false;
    fetchUser();
    return () => {
      isUnmounted = true;
    }
  }, [params, history, currentUser]);


  if (!user) return null;

  return (
    <UserForm user={user} />
  );
}

export default EditProfile;