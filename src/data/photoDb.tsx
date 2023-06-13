export interface Photo {
  id: number;
  url: string;
  name: string;
  liked: boolean;
}

export const Photos: Photo[] = [
    {
      id: 1,
      name: 'The Trails',
      url: 'https://images.pexels.com/photos/13835530/pexels-photo-13835530.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false
    },
    {
      id: 2,
      name: 'River',
      url: 'https://images.pexels.com/photos/15202881/pexels-photo-15202881.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false
    },
    {
      id: 3,
      name: 'The Lakeside',
      url: 'https://images.pexels.com/photos/11389480/pexels-photo-11389480.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false
    },
    {
        id: 4,
        name: 'The Hike',
        url: 'https://images.pexels.com/photos/13172865/pexels-photo-13172865.jpeg?auto=compress&cs=tinysrgb&w=800',
        liked: false
      },
      {
        id: 5,
        name: 'The Chill Hill',
        url:'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800',
        liked: false
      },
      {
        id: 6,
        name: 'The Bridge',
        url:'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800',
        liked: false
      },
      {
        id: 7,
        name: 'The Autumn',
        url:'https://images.pexels.com/photos/1808329/pexels-photo-1808329.jpeg?auto=compress&cs=tinysrgb&w=800',
        liked: false
      },
      {
        id: 8,
        name: 'The Cliff',
        url:'https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg?auto=compress&cs=tinysrgb&w=800',
        liked: false
      },

  ];