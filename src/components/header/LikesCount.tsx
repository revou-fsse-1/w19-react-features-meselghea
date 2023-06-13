const CountLikedPhotos = async (): Promise<number> => {
    const storedLikes = await Promise.resolve(sessionStorage.getItem('likes'));
    if (storedLikes) {
      const parsedLikes = JSON.parse(storedLikes);
      const likedPhotos = Object.values(parsedLikes).filter((liked) => liked === true);
      return likedPhotos.length;
    }
    return 0;
  };
  
  export default CountLikedPhotos;