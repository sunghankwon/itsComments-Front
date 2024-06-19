import { useEffect } from "react";
import axios from "axios";
import useFriendsStore from "../store/useFriends";
import useUserStore from "../store/useUser";

function useFetchFriends() {
  const { userData } = useUserStore();
  const { setFriendsList } = useFriendsStore();

  useEffect(() => {
    async function getFriends() {
      const user = { id: userData._id };

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/friends`,
          {
            params: user,
          },
          { withCredentials: true },
        );

        setFriendsList(res.data.friends);
      } catch (error) {
        console.log(error);
      }
    }

    if (userData._id) {
      getFriends();
    }
  }, [userData._id, setFriendsList]);
}

export default useFetchFriends;
