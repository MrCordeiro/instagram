import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Photos from "./photos";
import { getUserPhotosByUserId } from "../../services/firebase";

export default function Profile({ user }) {
  // This reducer just overwrites the state with the new state
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0,
  };

  // useReducer is an alternative to useState
  // Here, we're using it to manage state for user, photos and follower count
  // in a single object instead of 3 useStates
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId);

      // `dispatch` is what updates the state
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    getProfileInfoAndPhotos();
  }, [user.username]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch} // this will be used to update the follower count when triggered by the Header component
      />
      <Photos photos={photosCollection} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
  }),
};
