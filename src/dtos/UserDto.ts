export class UserCreationDTO {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public name: string,
        public ktp_image: string,
        public balance: number,
        public is_admin: boolean
    ) {}
}