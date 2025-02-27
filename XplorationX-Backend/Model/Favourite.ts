class Favourite {
   FavId: number;
   FavTopic: string;
   UserId: number;


    constructor(FavId: number, FavTopic: string,UserId: number) {
        this.FavId = FavId;
        this.FavTopic = FavTopic;
        this.UserId = UserId;
    }

}

export default Favourite;