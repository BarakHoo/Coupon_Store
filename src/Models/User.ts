export class User {
    public id:number;
    public name: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: string;
    public password:string;

    constructor(id: number, name: string, firstname: string, lastname: string, email: string, role: string, password:string) {
        this.id = id;
        this.name = name;
        this.firstName = firstname;
        this.lastName = lastname;
        this.email = email;
        this.role = role;
        this.password = password;
    }
}
export default User;

