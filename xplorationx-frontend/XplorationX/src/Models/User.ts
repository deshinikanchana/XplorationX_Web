class User {
    UserId: number;
    Name: string;
    Email: string;
    Password: string;

    constructor(UserId: number, Name: string, Email: string, Password: string) {
        this.UserId = UserId;
        this.Name = Name;
        this.Email = Email;
        this.Password = Password;
    }

}

export default User;