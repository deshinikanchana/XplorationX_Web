class Notes {
    NoteId: number;
    UserId: number;
    Topic: string;
    Description: string;

    constructor(NoteId: number, UserId: number, Topic: string, Description: string) {
        this.NoteId = NoteId;
        this.UserId = UserId;
        this.Topic = Topic;
        this.Description = Description;
    }

}

export default Notes;